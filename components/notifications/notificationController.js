const notificationsService = require('./notificationService');
const scoresService = require('../scores/scoresService');;
const classesService = require('../classes/classesService');

class notificationsController {

    async viewList(req, res, next) {
        try {
            return res.json(await notificationsService.notiCategory(req.user.id));
        } catch (err) {
            next(err);
        }
    }

    async viewListUnread(req, res, next) {
        try {
            return res.json(await notificationsService.notiUnreadCategory(req.user.id));
        } catch (err) {
            next(err);
        }
    }

    async markReviewDone(req, res, next) {
        try {
            const { noti_id } = req.params;

            await notificationsService.markViewed(noti_id);
            res.json({
                isSuccess: true,
                message: "Mark View successfully"
            })

        } catch (err) {
            next(err);
        }
    }

    async createStudentGradeNoti(req, res, next) {
        try {
            const { grade_id } = req.params;

            const grade = await scoresService.findGradeById(grade_id);
            const clas = await classesService.findClassbyId(grade.class_id);

            await notificationsService.createStudentGradeNoti(grade.class_id, grade.name, clas.name);

            res.json({
                isSuccess: true,
                message: "Make Notification successfully"
            })

        } catch (err) {
            next(err);
        }
    }
}

module.exports = new notificationsController;