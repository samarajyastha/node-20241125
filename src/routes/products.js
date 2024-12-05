import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

/**
 * Get all products
 * URL: /api/products
 * METHOD: GET
 */
router.get("/", getAllProducts);

/**
 * Get categories
 * URL: /api/products/categories
 * METHOD: GET
 */
router.get("/categories", getCategories);

/**
 * Get product by id
 * URL: /api/products/:id
 * METHOD: GET
 */
router.get("/:id", getProductById);

/**
 * Create a product
 * URL: /api/products
 * METHOD: POST
 */
router.post("/", auth, addProduct);

/**
 * Create a product
 * URL: /api/products/:id
 * METHOD: PUT
 */
router.put("/:id", auth, updateProduct);

/**
 * Create a product
 * URL: /api/products/:id
 * METHOD: DELETE
 */
router.delete("/:id", [auth, roleBasedAuth("ADMIN")], deleteProduct);

export default router;
