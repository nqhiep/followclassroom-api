const express = require('express');
const router = express.Router();
const scoresController = require('./scoresController');
const { validateBody, schemas } = require('../../middlewares/inputValidation');

router.post('/:gradeId', validateBody(schemas.updateSpecificScore), scoresController.updateSpecificScore);


module.exports = router;