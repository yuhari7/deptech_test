import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1"; // Adjust if necessary

// Function to get all admins
export const getAdmins = async () => {
  const response = await axios.get(`${API_BASE_URL}/admins`);
  return response.data;
};

// Function to add a new admin
export const createAdmin = async (admin) => {
  const response = await axios.post(`${API_BASE_URL}/admins`, admin);
  return response.data;
};

// Function to update an admin
export const updateAdmin = async (id, admin) => {
  const response = await axios.patch(`${API_BASE_URL}/admins/${id}`, admin);
  return response.data;
};

// Function to delete an admin
export const deleteAdmin = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admins/${id}`);
  return response.data;
};

// Repeat similar functions for categories, products, and transactions
