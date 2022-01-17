const express = require('express');
const router = express.Router();
const commentsController = require('./commentsController');

router.get('/:review_id', commentsController.viewList);

router.post('/:review_id', commentsController.createComment);

module.exports = router;
