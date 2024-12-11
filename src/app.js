import dotenv from "dotenv";
import express from "express";
import path from "path";
import url from "url";
import cors from "cors";
import multer from "multer";
import fs from "fs";

import authMiddleware from "./middlewares/auth.js";
import authRoute from "./routes/auth.js";
import bodyParser from "body-parser";
import connectDB from "./database.js";
import logger from "./middlewares/logger.js";
import ordersRoute from "./routes/orders.js";
import productService from "./services/productService.js";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(
      null,
      `${uniqueSuffix}-${file.originalname}`
    );
  },
});

const upload = multer({ storage: storage });

const app = express();

dotenv.config();

connectDB();

app.set("view engine", "hbs");

app.use(
  "/images",
  express.static(path.join(__dirname, "../public/assets/images"))
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);

// HTTP GET method
app.get("/", (req, res) => {
  res.json({
    name: "nodejs-20241125",
    version: "1.0.0",
    license: "MIT",
    port: 5000,
  });
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.use("/api/users", upload.single("image"), usersRoute);

/**
 * Login, Register, Forgot password, Reset password
 * Auth
 */
app.use("/api/auth", authRoute);

// Products route
app.use("/api/products", productsRoute);

// Orders route
app.use("/api/orders", ordersRoute);

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

app.get("/login", (req, res) => {
  res.render("login", { user: "John" });
});

app.get("/home", authMiddleware, async (req, res) => {
  const user = req.user;

  const products = await productService.getAllProducts({
    limit: 10,
    offset: 0,
  });

  res.render("index", { user, products });
});

app.get("/products/:id", authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  console.log(id);

  const product = await productService.getProductById(id);

  res.render("product", { user, product });
});

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
