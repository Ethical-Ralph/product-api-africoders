const cartRoute = require("express").Router();
const cartService = require("../service/cart");

cartRoute.post("/cart", async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.productId || !data.quantity) {
      throw new Error("Product id and quantity are required");
    }

    const payload = {
      userId: req.user.id,
      cartData: data,
    };

    const cart = await cartService.addToCart(payload);

    res.json({
      status: 200,
      data: cart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    next(error);
  }
});

cartRoute.get("/cart", async (req, res, next) => {
  try {
    const carts = await cartService.getCart(req.user.id);

    res.json({
      status: 200,
      data: carts,
      message: "cart fetched successfully",
    });
  } catch (error) {
    next(error);
  }
});

cartRoute.delete("/cart", async (req, res, next) => {
  try {
    await cartService.deleteCart(req.user.id);

    res.json({
      status: 200,
      data: {},
      message: "cart deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

cartRoute.delete("/cart/product", async (req, res, next) => {
  try {
    const { productId } = req.body;

    await cartService.removeFromCart({
      userId: req.user.id,
      productId,
    });

    res.json({
      status: 200,
      data: {},
      message: "product deleted from cart successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = cartRoute;
