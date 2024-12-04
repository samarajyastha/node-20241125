import Product from "../models/Product.js";

const getAllProducts = async () => {
  return await Product.find();
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

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
