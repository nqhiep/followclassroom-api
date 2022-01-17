const reviewsService = require('./reviewsService');
const scoresService = require('../scores/scoresService');
const ClassRole = require('../../enums/class_role.enum');

class reviewsController {
    async createReview(req, res, next) {
        try {
            const score = await reviewsService.findOneScore(req.body.grade_id, req.user.id);
            if (!score) { return next(new Error("Not found score")); }

            let data = {
                score_id: score.id,
                expected_score: req.body.expected_score,
                student_explanation: req.body.explan,
                is_review_done: false
            };

            await reviewsService.createNewReview(data);
            return res.json(
                {
                    isSuccess: true,
                    message: "Create review successfully!"
                })

        } catch (err) {
            return next(err);
        }
    }

    async viewList(req, res, next) {
        try {
            const { class_id } = req.params;

            const isTeacher = await scoresService.checkRoleInClass(class_id, req.user.id, ClassRole.TEACHER);

            if (!isTeacher) {
                return res.json(await reviewsService.studentReviewsCategory(class_id, req.user.id));
            }

            return res.json(await reviewsService.teacherReviewsCategory(class_id));

        } catch (err) {
            next(err);
        }
    }

    async markReviewDone(req, res, next) {
        try {
            const { class_id } = req.params;
            const { review_id } = req.body;

            const isTeacher = await scoresService.checkRoleInClass(class_id, req.user.id, ClassRole.TEACHER);

            if (!isTeacher) {
                return next(new Error("Not have permission"));
            }

            await reviewsService.markReviewDone(review_id);
            res.json({
                isSuccess: true,
                message: "Update score successfully"
            })

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new reviewsController();
