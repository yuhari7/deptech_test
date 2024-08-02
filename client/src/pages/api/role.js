import { API_BASE_URL } from "@/utils/dbConnection";
import axios from "axios";

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data || []; // Ensure it returns an empty array if no data
  } catch (error) {
    console.error("Error fetching roles:", error);
    return []; // Return an empty array in case of error
  }
};
