const InvariantError = require("../../exceptions/InvariantError");
const { LoginPayloadSchema } = require('./schema');

module.exports = {
  validateLoginPayload: (payload) => {
    const validationResult = LoginPayloadSchema.validate(payload, { allowUnknown: false, presence: 'required', keys: allowedFields });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};