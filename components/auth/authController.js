var jwt = require('jsonwebtoken');
const userService = require('./userService');
const { JWT_SECRET } = require('../../config/authentication');

const encodedToken = (userId) => {
    return jwt.sign({
        iss: "followclassroom",
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 30)
    }, JWT_SECRET)
}

class AuthController {
    async signUp(req, res) {
        try {
            const isExist = await userService.isExistEmail(req.body.email);
            if(isExist) return res.json({
                isSuccess: false,
                message: "Email already in use!"
            })

            await userService.createUser(req.body);
            return res.json(
                {
                    isSuccess: true,
                    message: "Sign up successfully!"
                }
            );
        } catch(err) {
            res.json(
                {
                    isSuccess: false,
                    message: "Server error"
                }
            );
        }
    }

    async signIn(req, res) {
        const token = encodedToken(req.user.id);
        res.setHeader('Authorization', token);
        res.json({ isSuccess: true });
    }
}

module.exports = new AuthController();