const express = require('express');
const router = express.Router();
const gradeBoardController = require('./gradeBoardController');

/* GET users listing. */
router.get('/:classid', gradeBoardController.showCategory);
router.post('/:classid', gradeBoardController.createNew);

module.exports = router;