import User from "../models/User.js";

const getAllUsers = async () => {
  const users = await User.find();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

const addUser = async (input) => {
  const user = await User.create(input);

  return user;
};

const updateUser = async (id, input) => {
  if (input.email)
    throw {
      statusCode: 400,
      message: "Email cannot be updated.",
    };

  return await User.findByIdAndUpdate(id, input);
};

const updateProfileImage = async (id, profileImageUrl) => {
  return await User.findByIdAndUpdate(id, { profileImageUrl });
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  updateProfileImage,
};
