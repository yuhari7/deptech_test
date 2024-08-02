import { API_BASE_URL } from "@/utils/dbConnection";
import axios from "axios";

// Function to get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array or handle the error as needed
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Function to create a new product
export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Function to update a product
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/products/${id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Function to delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
