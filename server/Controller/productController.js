import { Category, Product } from "../utils/models/index.js";

// Endpoints for Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  const { productName, productDescription, productImage, categoryId, stock } =
    req.body;

  if (!productName || !categoryId || !stock) {
    return res.status(400).json({
      error: "Missing required fields: productName, categoryId, and stock",
    });
  }

  try {
    // Validate categoryId
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid Category ID" });
    }

    // Create the product if the categoryId is valid
    const newProduct = await Product.create({
      productName,
      productDescription,
      productImage,
      categoryId,
      stock,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "Error creating product", details: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { productName, productDescription, productImage, categoryId, stock } =
      req.body;
    const [updated] = await Product.update(
      { productName, productDescription, productImage, categoryId, stock },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      return res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
