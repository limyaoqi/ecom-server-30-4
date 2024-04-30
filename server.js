const express = require("express");
const app = express();
const PORT = 8888;
const mongoose = require("mongoose");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ecom")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", require("./routes/product"));
app.use("/category", require("./routes/categories"));

app.listen(PORT, () => {
  console.log(`App is running in this ${PORT} `);
});
