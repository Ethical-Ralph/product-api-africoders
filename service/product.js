const productRepo = require("../repository/productRepo");

exports.create = async (data) => {
  try {
    if (!data.name || !data.category || !data.price || !data.quantity) {
      throw new Error("Validation error");
    }

    const product = productRepo.create(data);

    return product;
  } catch (error) {
    throw error;
  }
};
