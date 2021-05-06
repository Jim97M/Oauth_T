const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

module.exports = {
    authSchema
}