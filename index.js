console.log("hello world");

// import
// const generateRandomNumber = require("./util.js");

import generateRandomNumber, { square } from "./util.js";

const randomNumber = generateRandomNumber();

console.log(randomNumber);

const squaredValue = square(5);

console.log(squaredValue);
