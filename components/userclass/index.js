const express = require('express');
const router = express.Router();
const userClassController = require('./userClassController');

/* GET users listing. */
router.get('/:id', userClassController.showUserClassList);

module.exports = router;

