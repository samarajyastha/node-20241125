// function getAllUsers() {}
import FormData from "form-data";
import fs from "fs";
import userService from "../services/userService.js";
import axios from "axios";

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

    if (!input.email || !input.password)
      return res.status(422).send("Email or password is required.");

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
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  const file = req.file;
  const id = req.params.id;
  /**
   * 1. Send file in request
   *   a. Use form-data to select file
   * 2. Use Multer to read files
   * 3. Upload file in bucket
   * 4. Save the file url in db
   */

  const fileContent = fs.readFileSync(file.path);

  try {
    const formData = new FormData();
    formData.append("image", fileContent.toString("base64"));

    const config = {
      method: "POST",
      url: `https://api.imgbb.com/1/upload?key=${process.env.BUCKET_KEY}`,
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    };

    const fileUploadResponse = await axios(config);

    const response = await userService.updateProfileImage(
      id,
      fileUploadResponse.data.data.url
    );

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    fs.unlinkSync(file.path);
  }
};

export { getAllUsers, getUserById, addUser, updateUser, updateProfileImage };
