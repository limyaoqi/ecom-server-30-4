const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  let categories = [];
  const products = await Product.find();
  products.forEach((product) => {
    // if is not available, then only add into genres
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });
  res.status(200).send(categories);
});

module.exports = router;
