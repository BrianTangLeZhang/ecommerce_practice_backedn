const Product = require("../models/Product");
const Category = require("../models/Category");

const getCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (e) {
    throw new Error(e);
  }
};

const addCategory = async (name) => {
  try {
    const newCate = new Category({
      name: name,
    });
    await newCate.save();
    return newCate;
  } catch (e) {
    throw new Error(e);
  }
};

const updateCategory = async (id, name) => {
  try {
    const updatedCate = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );
    return updatedCate;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCate = await Category.findByIdAndDelete(id);
    return deletedCate;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
