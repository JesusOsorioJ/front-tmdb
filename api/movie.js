import { withoutAuthApi } from "./axios";
import axios from 'axios';
 
export const getGenres = async () => {
  try {
    const response = await withoutAuthApi.get("/movies/get/genres");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMovies = async (query = "") => {
  try {
    const response = await withoutAuthApi.get(`/movies${query}`);
    return response.data;
  } catch (error) {
    return error;
  }
};