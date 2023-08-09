const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  Email: Joi.string()
    .alphanum()
    .required(),
  Username: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  Password: Joi.string()
    .alphanum().min(7)
    .max(15)
    .required(),
  Total_score: Joi.number()
    .integer(),
  Biodata: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/),
  city: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
});

module.exports = { UserPayloadSchema };
