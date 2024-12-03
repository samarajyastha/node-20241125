import User from "../models/User.js";
import bcrypt from "bcryptjs";

const registerUser = async (input) => {
  const user = await User.findOne({ email: input.email });

  if (user) {
    throw {
      statusCode: 400,
      message: "User already exists.",
    };
  }

  const hashedPassword = bcrypt.hashSync(input.password);

  const createdUser = await User.create({
    name: input.name,
    address: input.address,
    email: input.email,
    password: hashedPassword,
    roles: input.roles,
  });

  return {
    id: createdUser._id,
    address: createdUser.address,
    createdAt: createdUser.createdAt,
    email: createdUser.email,
    name: createdUser.name,
    roles: createdUser.roles,
  };
};

const loginUser = async (input) => {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found.",
    };
  }

  const isPasswordMatch = bcrypt.compareSync(input.password, user.password);

  if (!isPasswordMatch)
    throw {
      statusCode: 400,
      message: "Incorrect email or password",
    };

  return {
    id: user._id,
    address: user.address,
    createdAt: user.createdAt,
    email: user.email,
    name: user.name,
    roles: user.roles,
  };
};

export default { registerUser, loginUser };

// Authentication => Is user valid
// Authorization => Is valid user allowed to do some tasks

// token => json web token

/**
 * 1. Session
 * 2. Cookie
 * 3. Localstorage
 */
