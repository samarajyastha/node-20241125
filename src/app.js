import express from "express";
import usersRoute from "./routes/users.js";
import bodyParser from "body-parser";
import connectDB from "./database.js";
import dotenv from "dotenv";
import logger from "./middlewares/logger.js";
import authRoute from "./routes/auth.js";
import productsRoute from "./routes/products.js";

const app = express();

dotenv.config();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);

// HTTP GET method
app.get("/", (req, res) => {
  res.json({
    name: "nodejs-20241125",
    version: "1.0.0",
    license: "ISC",
    port: 5000,
  });
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.use("/api/users", usersRoute);

/**
 * Login, Register, Forgot password, Reset password
 * Auth
 */
app.use("/api/auth", authRoute);

// Products route
app.use("/api/products", productsRoute);

// app.get("/api/users", (req, res) => {
//   const data = fs.readFileSync("./data/users.json", "utf8");

//   const parsedData = JSON.parse(data);

//   res.json(parsedData);
// });

// app.get("/api/users/:id", (req, res) => {
//   const id = req.params.id;

//   const data = fs.readFileSync("./data/users.json", "utf8");

//   const parsedData = JSON.parse(data);

//   const user = parsedData.find((user) => user.id == id);

//   res.json(user);
// });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});

// HTTP Methods
// CRUD => Create, Read, Update, Delete operations
/**
 * 1. GET => Read
 * 2. POST => Create
 * 3. PUT => Update/Edit
 * 4. DELETE => Delete
 */
