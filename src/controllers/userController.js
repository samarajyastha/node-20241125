// function getAllUsers() {}
import userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await userService.getUserById(id);

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const input = req.body;

    const data = await userService.addUser(input);

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;

    const data = await userService.updateUser(id, input);

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAllUsers, getUserById, addUser, updateUser };
