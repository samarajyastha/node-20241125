import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/authController.js";

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

/**
 * Forgot password route
 * Url: /api/auth/forgot-password
 * Method: POST
 */
router.post("/forgot-password", forgotPassword);

/**
 * Reset password route
 * Url: /api/auth/reset-password/:userId
 * Method: POST
 */
router.post("/reset-password/:userId", resetPassword);

router.post("/logout", logoutUser);

export default router;
