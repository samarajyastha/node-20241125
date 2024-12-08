import jwt from "jsonwebtoken";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regex.js";
import authService from "../services/authService.js";
import { createToken } from "../helpers/authHelpers.js";

const registerUser = async (req, res) => {
  const input = req.body;

  try {
    if (!input.email || !input.name || !input.password) {
      throw {
        statusCode: 422,
        message: "Required data are missing.",
      };
    }

    if (!EMAIL_REGEX.test(input.email)) {
      throw {
        statusCode: 400,
        message: "Invalid email address",
      };
    }

    if (input.password.length < 8) {
      throw {
        statusCode: 400,
        message: "Password should have minimum 8 characters.",
      };
    }

    if (!PASSWORD_REGEX.test(input.password)) {
      throw {
        statusCode: 400,
        message:
          "Password must contain at least one number, one letter and one special character.",
      };
    }

    const data = await authService.registerUser(input);

    const token = createToken(data);

    res.cookie("authToken", token);

    res.json({ ...data, token });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const input = req.body;

  try {
    const data = await authService.loginUser(input);

    const token = createToken(data);

    res.cookie("authToken", token);

    res.json({ ...data, token });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;

  if (!email) return res.status(422).send("Email is required.");

  try {
    // send reset password link to the email
    const data = await authService.forgotPassword(email);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const token = req.query.token;
  const userId = req.params.userId;

  if (!password) return res.status(422).send("Password is required.");

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    const data = await authService.resetPassword(userId, password, token);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("authToken");

  res.json({ message: "Logout successful." });
};

export { registerUser, loginUser, forgotPassword, resetPassword, logoutUser };
