const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const { validateBody, schemas } = require('../../middlewares/inputValidation');
var passport = require('../../middlewares/passport');

//[POST] /sign-up
router.post('/sign-up',
    validateBody(schemas.signUpSchema),
    AuthController.signUp
);

//[POST] /sign-in
router.post('/sign-in',
    validateBody(schemas.signInSchema),
    passport.authenticate('local', { session: false }),
    AuthController.signIn
);

//[POST] /secret (For test)
router.post('/secret',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        console.log(req.user);
        res.json({success: true})
    }
)


module.exports = router;
