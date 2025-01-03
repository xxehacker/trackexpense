import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

// send message api
export const contactApi = async ({
  firstName,
  lastName,
  email,
  phone,
  message,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/contact`,
      {
        firstName,
        lastName,
        email,
        phone,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};
