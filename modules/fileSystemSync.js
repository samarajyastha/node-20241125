// File system modules 2 types - Synchronous and Asynchronous

import fs from "fs";

// 1. Sync
// Read
const data = fs.readFileSync("./log.txt", "utf8");
console.log(data);

const data2 = fs.readFileSync("./write.txt", "utf8");
console.log(data2);

const image = fs.readFileSync("./image.jpg", "base64");
// console.log(image);

// const pdf = fs.readFileSync("./sample.pdf", "base64");
// console.log(pdf);

// write
fs.writeFileSync("write.txt", "This text is written second time.");

// append
fs.appendFileSync("write.txt", data);

// delete
// fs.rmSync("sample.pdf");
