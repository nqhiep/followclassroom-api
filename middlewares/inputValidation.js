const Joi = require('joi');
const schemas = {
    signUpSchema: Joi.object({
        email: Joi.string()
            .email()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        confirm_password: Joi.ref('password')
    }),
    signInSchema: Joi.object({
        email: Joi.string()
            .email()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    }),

    updateSpecificScore: Joi.object({
        studentId: Joi.string()
            .min(1)
            .required(),
        score: Joi.number()
            .min(0)
            .max(10)
            .required()
    }),
}

function validateBody(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.json({
                isSuccess: false,
                message: error.message
            })
        }
    }
}

module.exports = { validateBody, schemas };