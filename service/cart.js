const Cart = require("../models/cart");
const Product = require("../models/Product");

// check is in cart
// if not add to product array
// if in cart increment quantity
exports.addToCart = async ({
  userId,
  cartData /** {productId, quantity} */,
}) => {
  try {
    const productExist = await Product.findById(cartData.productId);
    if (!productExist) {
      throw new Error("Product not found");
    }

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const product = cart.products.find(
        (p) => p.product.toString() === cartData.productId
      );

      if (product) {
        product.quantity += Number(cartData.quantity);
      } else {
        cart.products.push({
          product: cartData.productId,
          quantity: cartData.quantity,
        });
      }

      await cart.save();
    } else {
      const newCart = new Cart();
      newCart.userId = userId;
      newCart.products = [
        {
          product: cartData.productId,
          quantity: cartData.quantity,
        },
      ];
      await newCart.save();
    }
  } catch (error) {
    throw error;
  }
};

exports.getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: "products.product",
      select: "-__v -quantity",
    });

    return cart || {};
  } catch (error) {
    throw error;
  }
};

exports.removeFromCart = async ({ userId, productId }) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.quantity == 1) {
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );
    } else {
      product.quantity -= 1;
    }

    await cart.save();
  } catch (error) {
    throw error;
  }
};

exports.deleteCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    await cart.remove();
  } catch (error) {
    throw error;
  }
};
