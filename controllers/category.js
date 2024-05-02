const Product = require("../models/Product");

const getCategories = async () => {
  try {
    const products = await Product.find();
    let categories = [];
    products.forEach((p) => {
      if (!categories.includes(p.category)) categories.push(p.category);
    });
    return categories;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getCategories,
};
