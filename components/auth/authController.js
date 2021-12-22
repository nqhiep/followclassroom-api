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
            if (isExist) return res.json({
                isSuccess: false,
                message: "Email already in use!"
            });

            await authService.createUser(req.body);
            return res.json(
                {
                    isSuccess: true,
                    message: "Sign up successfully!"
                }
            );
        } catch (err) {
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

    async getfromToken(req, res) {
        const user_id = req.user.id;
        if (!user_id) {
            return res.json({
                isSuccess: false,
                message: "Unsuccessfully"
            });
        }

        const userInfor = await authService.findById(user_id);
        res.json({
            isSuccess: true,
            authorization: {
                id: userInfor.id,
                email: userInfor.email,
                gg_acount: userInfor.gg_account,
                fb_account: userInfor.fb_account,
                avatar: userInfor.avatar,
                student_id: userInfor.student_id
            }
        });
    }

    async updUser(req, res) {
        try {
            const isUpdate = await authService.updateUser(
                req.user.id,
                req.body.email,
                req.body.student_id,
                req.body.gg_account,
                req.body.fb_account
            );

            if (!isUpdate) {
                res.json({
                    isSuccess: false,
                    message: "Unsuccessful"
                });
            }

            res.json({
                isSuccess: true,
                message: "Successful"
            });

        } catch (err) {
            res.json(
                {
                    isSuccess: false,
                    message: "Server error"
                }
            );
        }
    }
}

module.exports = new AuthController();