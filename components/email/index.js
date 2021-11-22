const express = require('express');
const router = express.Router();
const emailController = require('./emailController');

router.post('/', emailController.postEmail);

module.exports = router;