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
  return await User.findByIdAndUpdate(id, input);
};

export default { getAllUsers, getUserById, addUser, updateUser };
