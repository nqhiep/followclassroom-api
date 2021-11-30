const express = require('express');
const router = express.Router();
const classesController = require('./gradesController.js');

/* GET users listing. */
router.get('/:classid', classesController.showCategory);

router.get('/:classid/:id', classesController.showGradeById);

router.post('/:classid', classesController.createNewGrade);

router.delete('/:classid/:id', classesController.deleteGrade);

module.exports = router;