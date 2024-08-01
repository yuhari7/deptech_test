import { readData, writeData } from "../helper/readAndWriteData.js";

// Endpoints for Product Categories
export const getAllCategories = (req, res) => {
  const categories = readData("db/categories.json");
  res.json(categories);
};

export const getCategoryById = (req, res) => {
  const categories = readData("db/categories.json");
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (category) {
    res.json(category);
  } else {
    res.status(404).send("Category not found");
  }
};

export const createCategory = (req, res) => {
  const categories = readData("db/categories.json");
  const newCategoryId = categories[categories.length - 1].id + 1;
  const newCategory = Object.assign({ id: newCategoryId }, req.body);
  categories.push(newCategory);
  writeData("db/categories.json", categories);
  res.status(201).json(newCategory);
};

export const editCategory = (req, res) => {
  const categories = readData("db/categories.json");
  const categoryIndex = categories.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (categoryIndex === -1) {
    return res.status(404).send("Category not found");
  }

  const updatedCategory = { ...categories[categoryIndex], ...req.body };
  categories[categoryIndex] = updatedCategory;
  writeData("db/categories.json", categories);
  res.json(updatedCategory);
};

export const deleteCategory = (req, res) => {
  const categories = readData("db/categories.json");
  const categoryIndex = categories.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (categoryIndex === -1) {
    return res.status(404).send("Category not found");
  }

  categories.splice(categoryIndex, 1);
  writeData("db/categories.json", categories);
  res.status(204).send();
};
