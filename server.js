const express = require("express");
const app = express();
const PORT = 8888;
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URL } = require("./config");

app.use(express.json());

const crossHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(crossHandler);

mongoose
  .connect(`${MONGODB_URL}ecom`)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/uploads", express.static("uploads"));
app.use("/", require("./routes/product"));
app.use("/users", require("./routes/user"));
app.use("/category", require("./routes/categories"));
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));
app.use("/images", require("./routes/image"));

app.listen(PORT, () => {
  console.log(`App is running in this ${PORT} `);
});
