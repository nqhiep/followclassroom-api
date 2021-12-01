const express = require('express');
const router = express.Router();
const classesController = require('./gradesController.js');

/* GET users listing. */
router.get('/:classid', classesController.showCategory);

router.get('/:classid/:id', classesController.showGradeById);

router.post('/:classid', classesController.createNewGrade);

router.put('/:classid', classesController.updateGradeOrder);

router.delete('/:classid/:id', classesController.deleteGrade);

router.put('/:classid/:id', classesController.updateGrade);

module.exports = router;