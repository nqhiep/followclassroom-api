const express = require('express');
const router = express.Router();
const classesController = require('./classlinkController');
const { validateBody, schemas } = require('../../middlewares/inputValidation');
var passport = require('../../middlewares/passport');

//[POST] /sign-up
router.post('/:linkid/sign-up',
    validateBody(schemas.signUpSchema),
    classesController.signUp
);

//[POST] /sign-in
router.post('/:linkid/sign-in',
    validateBody(schemas.signInSchema),
    passport.authenticate('local', { session: false}),
    classesController.signIn
);

//[POST] /auth/google
router.post('/:linkid/auth/google',
    passport.authenticate('google-token', { session: false }),
    classesController.signIn
);

module.exports = router;
