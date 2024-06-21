// api.js
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchSports = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/sports/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sports:", error);
    throw error;
  }
};

export const createSportSession = async (data, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/sport-session/create`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating sport session:", error);
    throw error;
  }
};
