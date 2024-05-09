const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//create express app
const app = express();

//middleware to handle JSON request
app.use(express.json());

//middleware to set up a crop golicy
app.use("/uploads", express.static("uploads"));

const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(corsHandler);

//connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.log(e));

app.use("/products", require("./routes/product"));
app.use("/categories", require("./routes/category"));
app.use("/payment", require("./routes/payment"));
app.use("/orders", require("./routes/order"));
app.use("/images", require("./routes/image"));

app.listen(5000, () => {
  console.log("Server is running on: http://localhost:5000");
});
