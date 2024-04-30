const Product = require("../models/Product");

const getProducts = async (category) => {
  try {
    let filters = {};
    let sortBy = { _id: 1 };
    if (category) filters.category = category;
    const products = await Product.find(filters).sort(sortBy);
    return products;
  } catch (e) {
    throw new Error(e);
  }
};

const getProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (e) {
    throw new Error(e);
  }
};

const addProduct = async (product) => {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
  } catch (e) {
    throw new Error(e);
  }
};

const updateProduct = async (id, product) => {
  try {
    const newProduct = await Product.findByIdAndUpdate(product);

    return newProduct;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
};
