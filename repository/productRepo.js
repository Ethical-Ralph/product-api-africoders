const ProductModel = require("../models/Product");

exports.create = async ({ name, category, price, quantity }) => {
  const product = new ProductModel({
    name,
    category,
    price,
    quantity,
  });
  return product.save();
};

exports.findById = async (id) => {
  const products = await ProductModel.findById(id);
  return products;
};

exports.updateProduct = async (id, { name, category, price, quantity }) => {
  const product = await ProductModel.findById(id);
  product.name = name;
  product.category = category;
  product.price = price;
  product.quantity = quantity;
  await product.save();
};

exports.deleteProduct = async (id) => {
  return ProductModel.deleteOne(id);
};

exports.getAll = async () => {
  const products = await ProductModel.find();
  return products;
};
