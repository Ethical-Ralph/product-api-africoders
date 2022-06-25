const mongoose = require("mongoose");

const CartModel = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "product" },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("cart", CartModel);
