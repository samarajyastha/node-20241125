import productService from "../services/productService.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.json(products);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productService.getProductById(id);

    if (!product) return res.status(404).send("Product not found.");

    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const addProduct = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  try {
    if (data.urls.length > 5) {
      return res.status(400).send("Product images cannot be more than 5.");
    }

    const product = await productService.addProduct(data, userId);

    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const user = req.user;

  try {
    const product = await productService.getProductById(id);

    if (product.urls.length > 5) {
      return res.status(400).send("Product images cannot be more than 5.");
    }

    if (!product) return res.status(404).send("Product not found.");

    // Only ADMIN or created user can update products
    if (product.createdBy != user.id && !user.roles.includes("ADMIN")) {
      return res.status(403).send("Access denied");
    }

    const updatedProduct = await productService.updateProduct(id, data);

    res.json(updatedProduct);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productService.getProductById(id);

    if (!product) return res.status(404).send("Product not found.");

    await productService.deleteProduct(id);

    res.send(`Product with id: ${id} deleted successfully`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
