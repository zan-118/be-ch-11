const { compare, hash } = require('bcrypt');

module.exports = {
  hashPassword: async (password) => hash(password, 12),
  verifyPassword: async (password, hashedPassword) => compare(password, hashedPassword),
};
