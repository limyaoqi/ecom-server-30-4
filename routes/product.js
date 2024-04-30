const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProduct,
  updateProduct,
} = require("../controllers/product");
const Product = require("../models/Product");

// 1. Add a new product: `POST /products`
router.post("/products", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct = await addProduct(name, description, price, category);
    return res.status(200).send(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});
// 2. List all products: `GET /products`

router.get("/products", async (req, res) => {
  try {
    const category = req.query.category;
    const products = await getProduct(category);
    return res.status(200).send(products);
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});
// 3. Get specific product details by its ID: `GET /products/:id`

router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("product not found");
    return res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// 4. Update a product by its ID: `PUT /products/:id`
router.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct = await updateProduct(
      productId,
      name,
      description,
      price,
      category
    );
    return res.status(200).send(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// 5. Delete a product by its ID: `DELETE /products/:id`
router.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("product not found");

    await Product.findByIdAndDelete({ _id: productId });
    return res.status(200).send("Product Deleted Successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
});

module.exports = router;
