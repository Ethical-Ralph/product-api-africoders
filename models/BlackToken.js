const mongoose = require("mongoose");

const BlackToken = mongoose.Schema({
  token: String,
  userId: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("blackToken", BlackToken);
