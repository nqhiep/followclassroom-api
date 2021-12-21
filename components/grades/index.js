const express = require('express');
const router = express.Router();
const classesController = require('./gradesController.js');

router.get('/:classid', classesController.showCategory);

router.get('/:classid/:id', classesController.showGradeById);

router.post('/:classid', classesController.createNewGrade);

router.put('/:classid', classesController.updateGradeOrder);

router.put('/:classid/:id', classesController.updateGrade);

router.delete('/:classid/:id', classesController.deleteGrade);

module.exports = router;