const productRoute = require('express').Router();
const productService = require('../service/product');
const { getRedisData, setRedisData } = require('../utils/redis');

productRoute.post('/product', async (req, res, next) => {
  try {
    const data = req.body;

    const product = await productService.create(data);

    res.json({
      status: 200,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    next(error);
  }
});

// get all products
productRoute.get('/product', async (req, res, next) => {
  try {
    const products = await productService.getAll();

    const cachedProducts = await getRedisData('products');

    console.log(cachedProducts);

    if (!!cachedProducts) {
      await setRedisData('products', products);
    }

    res.json({
      status: 200,
      data: cachedProducts ?? products,
      message: 'Products fetched successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = productRoute;
