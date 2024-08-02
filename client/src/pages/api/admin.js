import { API_BASE_URL } from "@/utils/dbConnection";
import axios from "axios";
import Cookies from "js-cookie";

const createApiClient = () => {
  const token = Cookies.get("token");
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsers = async () => {
  const api = createApiClient();
  try {
    const response = await api.get("/admins");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.status,
      error.response?.data
    );
    return [];
  }
};

export const createAdmin = async (admin) => {
  const api = createApiClient();
  try {
    const response = await api.post("/admins", admin);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating admin:",
      error.response?.status,
      error.response?.data
    );
    throw new Error("Failed to create admin");
  }
};

export const getUserById = async (id) => {
  const token = Cookies.get("authToken");
  console.log("Token in getUserById:", token); // Debugging

  try {
    const response = await axios.get(`${API_BASE_URL}/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.status,
      error.response?.data
    );
    throw new Error("Failed to fetch user data");
  }
};

export const updateAdmin = async (id, admin) => {
  const token = Cookies.get("authToken");
  console.log("Token in updateAdmin:", token); // Debugging

  try {
    const response = await axios.patch(`${API_BASE_URL}/admins/${id}`, admin, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating admin:",
      error.response?.status,
      error.response?.data
    );
    throw new Error("Failed to update admin");
  }
};

export const deleteAdmin = async (id) => {
  const token = Cookies.get("authToken");
  console.log("Token in deleteAdmin:", token); // Debugging

  try {
    const response = await axios.delete(`${API_BASE_URL}/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting admin:",
      error.response?.status,
      error.response?.data
    );
    throw new Error("Failed to delete admin");
  }
};
