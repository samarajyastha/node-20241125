import { createServer } from "http";
import data from "./data.js";

const server = createServer((request, response) => {
  if (request.url == "/") {
    response.end("Home page");
  } else if (request.url == "/about") {
    response.end("about page");
  } else {
    response.writeHead(404);
    response.end("page not found");
  }
});

server.listen(5000, () => {
  console.log("Server running at port 5000...");
});
