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

export { registerUser, loginUser };
