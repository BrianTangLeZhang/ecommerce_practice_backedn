const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await addCategory(req.body.name);
    res.status(200).send(newCategory);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategory = await updateCategory(id, req.body.name);
    res.status(200).send(updatedCategory);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await deleteCategory(req.params.id);
    res.status(200).send(deletedCategory);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
