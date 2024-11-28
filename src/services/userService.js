import fs from "fs";

const getAllUsers = () => {
  const data = fs.readFileSync("./data/users.json", "utf8");

  const parsedData = JSON.parse(data);

  return parsedData;
};

const getUserById = (id) => {
  const data = fs.readFileSync("./data/users.json", "utf8");

  const parsedData = JSON.parse(data);

  const user = parsedData.find((user) => user.id == id);

  return user;
};

const addUser = (input) => {
  const data = fs.readFileSync("./data/users.json", "utf8");

  const parsedData = JSON.parse(data);

  parsedData.push(input);

  fs.writeFileSync("./data/users.json", JSON.stringify(parsedData));

  return parsedData;
};

export default { getAllUsers, getUserById, addUser };
