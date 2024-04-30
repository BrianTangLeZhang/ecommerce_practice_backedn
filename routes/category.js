const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    let categories = [];
    products.forEach((p) => {
      if (!categories.includes(p.category)) categories.push(p.category);
    });
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
