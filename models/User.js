const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  activeToken: String,
});

UserModel.methods.toJSON = function toJSON() {
  return {
    name: this.name,
    username: this.username,
    email: this.email,
  };
};

module.exports = mongoose.model("user", UserModel);
