import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Set a timeout (e.g., 10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

export const getActorDetails = async (actor_id) => {
    try {
      const actor = await axiosInstance.get(`/actors/${actor_id}`);
      const actor_movies = await axiosInstance.get(`/actors/${actor_id}/movies`);
      return [actor.data, actor_movies.data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};