const Joi = require('joi');

const SignUpSchema = Joi.object({
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
    SignUpSchema
}