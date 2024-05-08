const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, reuqired: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  total: {
    type: Number,
    reuqired: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed", "completed"], //limited the status option
  },
  billplz_id: String,
  paid_at: Date,
});

const Order = model("Order", OrderSchema);
module.exports = Order;
