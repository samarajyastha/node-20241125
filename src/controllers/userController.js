// function getAllUsers() {}
import userService from "../services/userService.js";

const getAllUsers = (req, res) => {
  const data = userService.getAllUsers();

  res.json(data);
};

const getUserById = (req, res) => {
  const id = req.params.id;

  const data = userService.getUserById(id);

  res.json(data);
};

const addUser = (req, res) => {
  const input = req.body;

  const data = userService.addUser(input);

  res.json(data);
};

export { getAllUsers, getUserById, addUser };
