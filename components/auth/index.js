const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const InputValidate = require('../../middlewares/inputValidation');
const { SignUpSchema } = require('../../helpers/validation_schema');

router.post('/sign-up', InputValidate(SignUpSchema), AuthController.signUp);


module.exports = router;
