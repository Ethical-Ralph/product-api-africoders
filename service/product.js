const productRepo = require("../repository/productRepo");

exports.create = async (data) => {
  try {
    if (!data.name || !data.category || !data.price || !data.quantity) {
      throw new Error("Validation error");
    }

    const product = await productRepo.create(data);

    return product;
  } catch (error) {
    throw error;
  }
};

exports.getAll = async () => {
  try {
    const products = await productRepo.getAll();

    return products;
  } catch (error) {
    throw error;
  }
};
