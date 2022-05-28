const productRoute = require("express").Router();
const productService = require("../service/product");

productRoute.post("/product", async (req, res, next) => {
  try {
    const data = req.body;

    const product = await productService.create(data);

    res.json({
      status: 200,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = productRoute;
