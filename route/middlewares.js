const tokenHelper = require("../utils/token");
const userRepo = require("../repository/userRepo");

const getToken = (req) => {
  // Bearer token
  const authToken = req.get("authorization");

  if (!authToken) {
    throw new Error("Auth token is missing");
  }

  const token = authToken.split(" ")[1];

  return token;
};

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = getToken(req);

    const isBlacklisted = await userRepo.tokenIsBlacklisted(token);
    if (isBlacklisted) {
      throw new Error("Token is invalid");
    }

    const decodedToken = tokenHelper.validateToken(token);

    const user = await userRepo.findByEmail(decodedToken.email);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
