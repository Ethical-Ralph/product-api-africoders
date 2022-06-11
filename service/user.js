const userRepo = require("../repository/userRepo");
const passwordHelper = require("../utils/password");
const tokenHelper = require("../utils/token");

exports.create = async (user) => {
  try {
    const emailExist = await userRepo.findByEmail(user.email.toLowerCase());
    if (emailExist) {
      throw new Error("A user with this email already exists");
    }

    const usernameExist = await userRepo.findByUsername(
      user.username.toLowerCase()
    );
    if (usernameExist) {
      throw new Error("A user with this username already exists");
    }

    user.password = await passwordHelper.hashPassword(user.password);
    const createdUser = await userRepo.create(user);

    return createdUser;
  } catch (error) {
    throw error;
  }
};

exports.login = async (user) => {
  // user: {userIdentifier, password}
  const userExist = await userRepo.findByEmailOrUsername(user.userIdentifier);
  console.log(userExist);

  if (!userExist) {
    throw new Error("User not found");
  }

  const passwordIsValid = await passwordHelper.compareHash(
    user.password,
    userExist.password
  );

  if (!passwordIsValid) {
    throw new Error("Incorrect password");
  }

  const tokenPayload = {
    username: userExist.username,
    email: userExist.email,
  };

  const token = tokenHelper.signToken(tokenPayload);

  return {
    ...tokenPayload,
    token,
  };
};

exports.login = async (user) => {
  // user: {userIdentifier, password}
  const userExist = await userRepo.findByEmailOrUsername(user.userIdentifier);

  if (!userExist) {
    throw new Error("User not found");
  }

  const passwordIsValid = await passwordHelper.compareHash(
    user.password,
    userExist.password
  );

  if (!passwordIsValid) {
    throw new Error("Incorrect password");
  }

  const tokenPayload = {
    username: userExist.username,
    email: userExist.email,
  };

  if (userExist.activeToken) {
    try {
      tokenHelper.validateToken(userExist.activeToken);
      await userRepo.blacklistToken(userExist._id, userExist.activeToken);
    } catch (error) {}
  }

  const token = tokenHelper.signToken(tokenPayload);
  await userRepo.saveActiveToken(userExist._id, token);

  return {
    ...tokenPayload,
    token,
  };
};
