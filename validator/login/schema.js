const Joi = require('joi');

const LoginPayloadSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  password: Joi.string()
    .alphanum().min(7)
    .max(15)
    .required(),
});

module.exports = LoginPayloadSchema;