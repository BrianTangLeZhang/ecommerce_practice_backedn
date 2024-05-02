const express = require("express");
const router = express.Router();
const { getCategories } = require("../../client/src/utils/api_products");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories()
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
