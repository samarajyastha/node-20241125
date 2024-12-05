import Product from "../models/Product.js";

const getAllProducts = async (query) => {
  const limit = query.limit;
  const offset = query.offset;
  const sort = JSON.parse(query.sort || "{}");
  const filters = JSON.parse(query.filters || "{}");

  return await Product.find(filters).limit(limit).sort(sort).skip(offset);
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const addProduct = async (data, userId) => {
  return await Product.create({
    ...data,
    createdBy: userId,
  });
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data);
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const getCategories = async () => {
  return await Product.distinct("category");
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
