const jwt = require("jsonwebtoken");
const config = require("../config");

const signToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET);
};

const validateToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

const tokenHelper = {
  signToken,
  validateToken,
};

module.exports = tokenHelper;
