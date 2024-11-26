import path from "path";

const filePath = "./path1/path2/path3/my-file.pdf";

// basename
const basename = path.basename(filePath);
console.log(basename);

// extname
const extension = path.extname(filePath);
console.log(extension);

// dirname
const directory = path.dirname(filePath);
console.log(directory);

// join
const newFilePath = path.join(directory, "path4", "my-path");
console.log(newFilePath);

// parse
console.log(path.parse(filePath));
