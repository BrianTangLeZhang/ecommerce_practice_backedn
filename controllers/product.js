const Product = require("../models/Product");

const getProducts = async (category, page = 1) => {
  try {
    let filters = {};
    let sortBy = { _id: -1 };
    if (category) filters.category = category;
    /* pagination
      .limit(n) - show n * items
      .skip()
    */
    let perPage = 6;
    const products = await Product.find(filters)
      .populate("category")
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort(sortBy);
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
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    return updatedProduct;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
};
