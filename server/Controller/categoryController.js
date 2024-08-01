import { Category } from "../utils/models/index.js";

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error); // Log the error
    res.status(500).json({
      status: "error",
      message: "Error fetching categories",
      details: error.message, // Provide more error details
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error); // Log the error
    res.status(500).json({
      status: "error",
      message: "Error fetching category",
      details: error.message, // Provide more error details
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    const newCategory = await Category.create({
      categoryName,
      categoryDescription,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error); // Log the error
    res.status(500).json({
      status: "error",
      message: "Error creating category",
      details: error.message, // Provide more error details
    });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    const [updated] = await Category.update(
      { categoryName, categoryDescription },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      return res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error("Error updating category:", error); // Log the error
    res.status(500).json({
      status: "error",
      message: "Error updating category",
      details: error.message, // Provide more error details
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(204).send();
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error("Error deleting category:", error); // Log the error
    res.status(500).json({
      status: "error",
      message: "Error deleting category",
      details: error.message, // Provide more error details
    });
  }
};
