import express from "express";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

/**
 * Route: /api/users
 * Method: GET
 */
router.get("/", auth, getAllUsers);

/**
 * Route: /api/users/:id
 * Method: GET
 */
router.get("/:id", auth, getUserById);

/**
 * Route: /api/users
 * Method: POST
 * To create a user
 */
router.post("/", auth, addUser);

/**
 * Route: /api/users/:id
 * Method: PUT
 * To update a user
 */
router.put("/:id", [auth, roleBasedAuth("ADMIN")], updateUser);

export default router;
