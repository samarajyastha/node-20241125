import express from "express";
import {
  addUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * Route: /api/users
 * Method: GET
 */
router.get("/", getAllUsers);

/**
 * Route: /api/users/:id
 * Method: GET
 */
router.get("/:id", getUserById);

/**
 * Route: /api/users
 * Method: POST
 * To create a user
 */
router.post("/", addUser);

export default router;
