import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

// Add transaction Api
export const addTransactionApi = async ({
  type,
  amount,
  date,
  description,
  category,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/transactions/create`,
      {
        type,
        amount,
        date,
        description,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add transaction"
    );
  }
};

//  List transaction Api
export const listTransactionApi = async ({
  category,
  startDate,
  endDate,
  type,
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
      params: {
        category,
        startDate,
        endDate,
        type,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

// Update transaction Api
export const updateTransactionApi = async ({
  id,
  type,
  amount,
  date,
  description,
  category,
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/transactions/update/${id}`,
      {
        type,
        category,
        amount,
        date,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    return error.response?.data?.message || "Failed to update transaction";
  }
};

//  delete transaction api
export const deleteTransactionApi = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/transactions/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete transaction"
    );
  }
};
