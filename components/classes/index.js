const express = require('express');
const router = express.Router();
const classesController = require('./classesController');

/* GET users listing. */
router.get('/', classesController.showCategory);

router.get('/:id', classesController.showClassById);

router.post('/', classesController.createNewClass);

router.put('/:id', classesController.updateCode);

router.post('/code', classesController.joinClassbyCode)

module.exports = router;

