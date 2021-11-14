var jwt = require('jsonwebtoken');
const authService = require('./authService');
const { JWT_SECRET } = require('../../config/authentication');

const encodedToken = (userId) => {
    return jwt.sign({
        iss: "followclassroom",
        sub: userId,
    }, JWT_SECRET, {
        expiresIn: '30d'
    })
}

class AuthController {
    async signUp(req, res) {
        try {
            const isExist = await authService.isExistEmail(req.body.email);
            if(isExist) return res.json({
                isSuccess: false,
                message: "Email already in use!"
            })

            await authService.createUser(req.body);
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
        res.json({
            authorization: token, 
            isSuccess: true,
            message: "Sign in successfully"
        });
    }
}

module.exports = new AuthController();