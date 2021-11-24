var jwt = require('jsonwebtoken');
const authService = require('./classlinkService');
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
            const isExistLink = await authService.findByLink(req.params.linkid);
            if(!isExistLink) return res.json({
                isSuccess: false,
                message: "LinkID is fail!"
            });

            const isExist = await authService.isExistEmail(req.body.email);
            if(isExist) return res.json({
                isSuccess: false,
                message: "Email already in use!"
            });

            await authService.createUser(req.body);

            const create = await authService.createUserClass(req.body.email, req.params.linkid);
            if(!create) return res.json({
                isSuccess: false,
                message: "Can't create user_class!"
            });

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
                    message: err
                }
            );
        }
    }

    async signIn(req, res) {
        const isExistLink = await authService.findByLink(req.params.linkid);
        if(!isExistLink) return res.json({
            isSuccess: false,
            message: "LinkID is fail!"
        });

        const roleinvite = await authService.findRoleByLink(req.params.linkid);
        console.log(roleinvite);
        const isExistUserInClass = await authService.findExistUserInClass(req.user.id, isExistLink.id, roleinvite);

        console.log(isExistUserInClass);

        const token = encodedToken(req.user.id);

        if(isExistUserInClass) return res.json({
            authorization: token,
            isSuccess: true,
            message: "Exist User"
        });

        console.log(req.params.linkid);
        const create = await authService.createUserClass(req.body.email, req.params.linkid);
        if(!create) return res.json({
            isSuccess: false,
            message: "Can't create user_class!"
        });

        res.json({
            authorization: token, 
            isSuccess: true,
            message: "Sign in successfully"
        });
    }
}

module.exports = new AuthController();