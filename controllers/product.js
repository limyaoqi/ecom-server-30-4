const Product = require("../models/Product");

const addProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
};

const getProduct = async (category) => {
  try {
    let filters = {};
    if (category) {
      filters.category = category;
    }
    const product = await Product.find(filters);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (productId, name, description, price, category) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error("product not found");
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        category,
      },
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { addProduct, getProduct, updateProduct };
