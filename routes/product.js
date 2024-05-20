const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
} = require("../controllers/product");
const { isUserValid, isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page;

    const products = await getProducts(category, page);
    if (products) res.status(200).send(products);
    else res.status(404).send("Products not found");
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.get("/:id", isUserValid, async (req, res) => {
  try {
    const id = req.params.id;

    const product = await getProduct(id);

    if (product) res.status(200).send(product);
    else res.status(404).send("Product not found");
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await addProduct(product);
    res.status(200).send(newProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };
    const target = await Product.findById(id);
    if (!target) res.status(404).send("Product not found");
    else {
      const updatedProduct = await updateProduct(id, product);
      res.status(200).send(updatedProduct);
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const target = await Product.findById(id);
    if (!target) res.status(404).send("Product not found");
    else {
      await Product.findByIdAndDelete(id);
      res.status(200).send("Deleted");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
