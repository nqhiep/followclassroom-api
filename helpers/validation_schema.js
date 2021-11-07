const Joi = require('joi');

const signUpSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    confirm_password: Joi.ref('password')
})

module.exports = {
    signUpSchema
}