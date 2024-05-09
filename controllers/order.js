const Order = require("../models/Order");
const axios = require("axios");
const {
  BILLPLZ_API_KEY,
  BILLPLZ_COLLECTION_ID,
  BILLPLZ_API_URL,
} = require("../config");

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
    const billplz = await axios({
      method: "POST",
      url: BILLPLZ_API_URL + `/v3/bills`,
      auth: {
        username: BILLPLZ_API_KEY,
        password: "",
      },
      data: {
        collection_id: BILLPLZ_COLLECTION_ID,
        email: order.customerEmail,
        name: order.customerName,
        amount: parseFloat(order.total) * 100,
        description: `Payment for Store`,
        callback_url: "http://localhost:3000/verify-payment",
        redirect_url: "http://localhost:3000/verify-payment",
      },
    });

    const billplz_id = billplz.data.id;
    const billplz_url = billplz.data.url;
    const newOrder = new Order({
      ...order,
      billplz_id: billplz_id,
    });
    await newOrder.save();
    return { ...newOrder, billplz_url: billplz_url };
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
