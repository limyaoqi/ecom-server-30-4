const Product = require("../models/Product");
const Category = require("../models/Category");

const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const addNewCategory = async (name) => {
  const newCategory =  new Category({
    name: name,
  });
  await newCategory.save()
  return newCategory;
};

const updateCategory = async (id, name) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
};

const deleteCategory = async (_id) => {
  const deletedCategory = await Category.findByIdAndDelete(_id);
  return deletedCategory;
};

module.exports = {
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
