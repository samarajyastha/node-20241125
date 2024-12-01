import { EMAIL_REGEX } from "../constants/regex.js";
import authService from "../services/authService.js";

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

    const data = await authService.registerUser(input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const input = req.body;

  try {
    const data = await authService.loginUser(input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export { registerUser, loginUser };
