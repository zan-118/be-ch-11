const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  Email: Joi.string()
    .required(),
  Username: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  Password: Joi.string()
    .alphanum().min(5)
    .max(20)
    .required(),
  Total_score: Joi.number()
    .integer(),
  Biodata: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/),
  City: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
});

module.exports = { UserPayloadSchema };
