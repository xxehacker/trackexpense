import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

// Login Api
export const loginApi = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

// Registration Api
export const registerApi = async ({ username, email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// update username and email
export const updateProfileApi = async ({ username, email }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/update`,
      {
        username,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};
