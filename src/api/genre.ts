import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Set a timeout (e.g., 10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllGenres = async () => {
    try {
      const response = await axiosInstance.get("/genres");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

export const getAllMoviesByGerensID = async (id,page) => {
    try {
      const response = await axiosInstance.get(`/genres/${id}/movies?page=${page}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  