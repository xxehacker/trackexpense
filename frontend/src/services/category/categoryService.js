import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Get token from localstorage
const token = getUserFromStorage();

// Add category Api
export const addCategoryApi = async ({ name, type }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/categories/create`,
      {
        name,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error(error.response?.data?.message || "Failed to add category");
  }
};

export const listCategoryApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

export const updateCategoryApi = async ({ name, type, id }) => {
  console.log("updateCategoryApi called with:", { name, type, id });
  try {
    const response = await axios.put(
      `${BASE_URL}/categories/update/${id}`,
      {
        name,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};

export const deleteCategoryApi = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error delete category:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to delete category"
    );
  }
};
