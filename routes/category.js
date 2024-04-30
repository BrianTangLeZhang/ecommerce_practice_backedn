const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    let categories = [];
    products.map((p) => {
      if (!categories.includes(p.category)) categories.push(p.category);
    });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = router;
