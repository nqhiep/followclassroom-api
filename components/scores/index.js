const express = require('express');
const router = express.Router();
const scoresController = require('./scoresController');
const { validateBody, schemas } = require('../../middlewares/inputValidation');

router.post('/:gradeId', validateBody(schemas.updateSpecificScore), scoresController.updateSpecificScore);

router.post('/:gradeId/import-scores', scoresController.importScores);

router.get('/:classId/export-scores', scoresController.exportScores);

module.exports = router;