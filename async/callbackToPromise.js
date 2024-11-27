import fs from "fs";

const readUsers = new Promise((resolve, reject) => {
  fs.readFile("../data/users.json", "utf8", (error, data) => {
    if (error) return reject(error);

    resolve(data);
  });
});

async function getData() {
  try {
    const users = await readUsers;

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

getData();
