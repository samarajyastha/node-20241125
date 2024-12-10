import express from "express";
import {
  createOrder,
  getAllOrdersOfAuthUser,
} from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

/**
 * Create an purchase order
 * URL: /api/orders
 * Method: POST
 */
router.post("/", auth, createOrder);

/**
 * Get orders of a user
 * URL: /api/orders/user
 * Method: GET
 */
router.get("/user", auth, getAllOrdersOfAuthUser);

export default router;

// User
// Your own order only

// Admin
// other users order as well
