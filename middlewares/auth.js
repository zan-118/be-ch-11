const jwt = require("jsonwebtoken");
const AuthorizationError = require('../exceptions/AuthorizationError');
const AuthenticationError = require("../exceptions/AuthenticationError");

const authOnly = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) {
        const error = new AuthorizationError("Forbidden");
        return next(error);
      }
      req.user = user;
      next();
    });
  } else {
    const error = new AuthenticationError("Unauthorized");
    return next(error);
  }
};

module.exports = authOnly;
