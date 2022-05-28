const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  //   _id: mongoose.Types.ObjectId,
  name: String,
  category: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("product", ProductModel);
