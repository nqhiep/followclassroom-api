const express = require('express');
const notificationController = require('./notificationController');
const router = express.Router();

router.get('/', notificationController.viewList);

router.get('/unread', notificationController.viewListUnread);

router.put('/mark/:noti_id', notificationController.markReviewDone);

router.post('/create/gradenoti/:grade_id', notificationController.createStudentGradeNoti);

module.exports = router;