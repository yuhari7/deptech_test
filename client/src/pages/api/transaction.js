import { API_BASE_URL } from "@/utils/dbConnection";
import axios from "axios";

// Function to get all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; // Return an empty array or handle the error as needed
  }
};

// Function to get a single transaction by ID
export const getTransactionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction ${id}:`, error);
    return null; // Return null or handle the error as needed
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/transactions`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return null; // Return null or handle the error as needed
  }
};
