const Product = require("../models/Product");

const addProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await Product.save();
  return newProduct;
};

const getProduct = async (category, perPage = 4, page = 1) => {
  try {
    let filters = {};
    if (category) {
      filters.category = category;
    }
    const product = await Product.find(filters)
      .populate("category")
      .limit(perPage) // 4
      .skip((page - 1) * perPage) //
      .sort({ _id: -1 });
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (
  productId,
  name,
  description,
  price,
  category,
  image
) => {
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
        image,
      },
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { addProduct, getProduct, updateProduct };
