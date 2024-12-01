import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * Register route
 * Url: /api/auth/register
 * Method: POST
 */
router.post("/register", registerUser);

/**
 * Login route
 * Url: /api/auth/login
 * Method: POST
 */
router.post("/login", loginUser);

export default router;
