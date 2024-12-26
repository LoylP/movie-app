import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Set a timeout (e.g., 10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMovieDetail = async (id) => {
    try {
      const movie_detail = await axiosInstance.get(`/movies/${id}/detail`);
      const actors = await axiosInstance.get(`/movies/${id}/actors`);
      const genres = await axiosInstance.get(`/movies/${id}/genres`);

      // merge actors and genres into movie_detail
      movie_detail.data[0].actors = actors.data;
      movie_detail.data[0].genres = genres.data;
      console.log(movie_detail.data[0]);
      return movie_detail.data[0];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};