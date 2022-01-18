const express = require('express');
const router = express.Router();
const reviewsController = require('./reviewsController');

router.get('/view/:class_id', reviewsController.viewList);

router.post('/mark/:class_id', reviewsController.markReviewDoneNoti);

router.post('/mark/:class_id', reviewsController.markReviewDone);

router.post('/create', reviewsController.createReview);

module.exports = router;