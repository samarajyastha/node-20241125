import { createServer } from "http";
import data from "./data.js";

const server = createServer((request, response) => {
  const formattedData = JSON.stringify(data);

  response.end(formattedData);
});

server.listen(5000, () => {
  console.log("Server running at port 5000...");
});
