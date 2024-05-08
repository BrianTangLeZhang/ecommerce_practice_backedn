const Order = require("../models/Order");
const router = require("../routes/product");

const getOrders = async () => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    return orders;
  } catch (e) {
    throw new Error(e);
  }
};

const getOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (e) {
    throw new Error(e);
  }
};

const addOrder = async (order) => {
  try {
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder;
  } catch (e) {
    throw new Error(e);
  }
};

const updateOrder = async (order, id) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        ...order,
      },
      {
        new: true,
      }
    );
    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOrder = async (id) => {
  try {
    await Order.findByIdAndDelete(id);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
};
