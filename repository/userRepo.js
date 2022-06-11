const UserModel = require("../models/User");
const BlackTokenModel = require("../models/BlackToken");

exports.findByEmailOrUsername = async (userIdentifier) => {
  const user = await UserModel.findOne({
    $or: [
      {
        username: userIdentifier,
      },
      {
        email: userIdentifier,
      },
    ],
  });

  return user;
};

exports.findByUsername = async (username) => {
  const user = await UserModel.findOne({ username });
  return user;
};

exports.findByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

exports.create = async ({ name, username, password, email }) => {
  const user = new UserModel({
    name,
    username,
    password,
    email: email.toLowerCase(),
  });
  return user.save();
};

exports.saveActiveToken = async (userId, token) => {
  await UserModel.updateOne(
    { _id: userId },
    {
      activeToken: token,
    }
  );
};

exports.blacklistToken = async (userId, token) => {
  const blt = new BlackTokenModel({
    userId,
    token,
  });

  return await blt.save();
};

exports.tokenIsBlacklisted = async (token) => {
  const tokenExist = await BlackTokenModel.findOne({
    token,
  });

  return !!tokenExist;
};
