const express = require('express');
const router = express.Router();
const classesController = require('./classesController');

/* GET users listing. */
router.get('/', classesController.showCategory);

router.get('/:id', classesController.showClassById);

router.post('/', classesController.createNewClass);

module.exports = router;

