const commentsService = require('./commentsService');
const reviewsService = require('../reviews/reviewsService');
const scoresService = require('../scores/scoresService');
const notificationsService = require('../notifications/notificationService');
const classesService = require('../classes/classesService');
const ClassRole = require('../../enums/class_role.enum');

class CommentsController {
    async createComment(req, res, next) {
        try {
            const { review_id } = req.params;

            const review = await reviewsService.findOneReview(review_id);
            if (!review) { return next(new Error("Not found review")); }
            const score = await scoresService.findScoreById(review.score_id);
            const grade = await scoresService.findGradeById(score.grade_id);
            const clas = await classesService.findClassbyId(grade.class_id);
            const isTeacher = await scoresService.checkRoleInClass(grade.class_id, req.user.id, ClassRole.TEACHER);

            let data = {
                review_id: review_id,
                user_id: req.user.id,
                content: req.body.content,
            };

            const result = await commentsService.createNewComment(data);
            if (!isTeacher) {
                await notificationsService.createTeacherCommentNoti(grade.class_id, grade.name, score.student_id, clas.name);
            } else {
                await notificationsService.createStudentCommentNoti(grade.class_id, grade.name, score.user_id, clas.name);
            }
            return res.json(
                {
                    isSuccess: true,
                    message: "Create comment successfully!",
                    result
                })

        } catch (err) {
            return next(err);
        }
    }

    async viewList(req, res, next) {
        try {
            const { review_id } = req.params;

            return res.json(await commentsService.commentsCategory(review_id));

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new CommentsController();
