import { API_BASE_URL } from "@/utils/dbConnection";
import axios from "axios";

// Function to get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array or handle the error as needed
  }
};

// Function to create a category
export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, updatedCategory) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/categories/${id}`,
      updatedCategory
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
