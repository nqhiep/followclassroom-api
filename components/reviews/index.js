const express = require('express');
const router = express.Router();
const reviewsController = require('./reviewsController');

router.get('/:class_id', reviewsController.viewList);

router.put('/:class_id', reviewsController.markReviewDone);

router.post('/create', reviewsController.createReview);

module.exports = router;