var passport = require('passport');
require('../../config/passport')(passport);
var jwt = require('jsonwebtoken');
const userService = require('./userService');

class AuthController {
    async signUp(req, res) {
        const isExist = await userService.isExistEmail(req.body.email);
        if(isExist) return res.json({
            status: "FAIL",
            message: "Email already in use!"
        })

        const newUser = await userService.createUser(req.body);
        return res.json(newUser);
    }

    async signIn(req, res) {
        const { email, password } = req.body;
        const user = await userService.checkCredential(email, password);
        if(user) {
            const token = jwt.sign({user}, "nodeauthsecret");
            res.json({success: true, token: 'JWT ' + token});
        } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
    }
}

module.exports = new AuthController();