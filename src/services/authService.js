import User from "../models/User.js";

const registerUser = async (input) => {
  const user = await User.findOne({ email: input.email });

  if (user) {
    throw {
      statusCode: 400,
      message: "User already exists.",
    };
  }

  const createdUser = await User.create(input);

  return createdUser;
};

const loginUser = async (input) => {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found.",
    };
  }

  // [TODO]: Match hashed password
  const isPasswordMatch = input.password === user.password;

  if (!isPasswordMatch)
    throw {
      statusCode: 400,
      message: "Incorrect email or password",
    };

  return user;
};

export default { registerUser, loginUser };
