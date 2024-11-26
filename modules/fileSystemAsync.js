import fs from "fs";
import fsPromise from "fs/promises";
// Callback

// Read
fs.readFile("./log.txt", "utf8", (error, data) => {
  if (error) throw error;

  //   console.log(data);
});

// console.log("Hello world");

fs.writeFile(
  "asyncWrite.txt",
  "This text is written asynchronously.",
  () => {}
);

// Promise - better
// Read
fsPromise
  .readFile("./log.txt", "utf8")
  .then((data) => {
    // console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

// async/await - Most preferred
async function readMyFile() {
  const data = await fsPromise.readFile("./log.txt", "utf8");

  console.log(data);
}

readMyFile();

// profile create
/**
 * 1. User account details -> db
 * 2. Personal details -> db
 * 3. CV.pdf -> time consuming
 * 4. Personal video -> very time consuming
 * 5. Response -> right now
 */
