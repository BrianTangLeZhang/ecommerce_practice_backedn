const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const Product = model("Product", ProductSchema);
module.exports = Product;
