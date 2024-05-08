const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/order");

router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    if (!orders) res.status(404).send("No orders found");
    res.status(200).send(orders);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const order = {
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      products: req.body.products,
      total: req.body.total,
      status: req.body.status,
    };
    const newOrder = await addOrder(order);
    res.status(200).send(newOrder);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplz_id,
      paid_at,
    } = req.body;
    const updatedOrder = await updateOrder(
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
        status,
        billplz_id,
        paid_at,
      },
      id
    );
    res.status(200).send(updatedOrder);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    if (order) {
      await deleteOrder(id);
      res.status(200).send("Deleted");
    }
    res.status(404).send("Order not found");
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
