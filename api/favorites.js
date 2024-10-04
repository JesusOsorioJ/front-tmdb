import { useTheme } from "@/store";
import { authApi } from "./axios";
const language = useTheme.getState().language;

export const setMovieFavorite = async (movieId = "") => {
  try {
    const response = await authApi.post(`/favorites/${movieId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeMovieFavorite = async (movieId = "") => {
  try {
    const response = await authApi.delete(`/favorites/${movieId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMoviesFavorite = async () => {
  try {
    const response = await authApi.get("/favorites");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllMoviesWithFavorites = async (query = "") => {
    try {
      const response = await authApi.get(`/favorites/getMovie/withFavorites${query}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const getMovieById = async (movieId = "") => {
    try {
      const response = await authApi.get(`/favorites/getById/${movieId}?language=${language}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

