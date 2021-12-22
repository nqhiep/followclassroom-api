const express = require('express');
const router = express.Router();
const gradeBoardController = require('./gradeBoardController');

router.get('/:classid', gradeBoardController.showCategory);

router.post('/:classid', gradeBoardController.createNew);

router.post('/:classid/upload-studentlist', gradeBoardController.uploadStudentList);




module.exports = router;