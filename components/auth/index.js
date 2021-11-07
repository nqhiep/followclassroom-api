const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const InputValidate = require('../../middlewares/inputValidation');
const { signUpSchema } = require('../../helpers/validation_schema');
var passport = require('passport');
require('../../config/passport')(passport);

router.post('/sign-up', passport.authenticate('jwt', { session: false}),
    InputValidate(signUpSchema),
    AuthController.signUp
);

//[POST] /sign-in
router.post('/sign-in', AuthController.signIn);


module.exports = router;
