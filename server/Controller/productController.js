import { readData, writeData } from "../helper/readAndWriteData.js";

// Endpoints for Products
export const getAllProducts = (req, res) => {
  const products = readData("db/products.json");
  res.json(products);
};

export const getProductById = (req, res) => {
  const products = readData("db/products.json");
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

export const createProduct = (req, res) => {
  const products = readData("db/products.json");
  const newProductId = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newProductId }, req.body);
  products.push(newProduct);
  writeData("db/products.json", products);
  res.status(201).json(newProduct);
};

export const editProduct = (req, res) => {
  const products = readData("db/products.json");
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  const updatedProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;
  writeData("db/products.json", products);
  res.json(updatedProduct);
};

export const deleteProduct = (req, res) => {
  const products = readData("db/products.json");
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  products.splice(productIndex, 1);
  writeData("db/products.json", products);
  res.status(204).send();
};
