import { useTheme } from "@/store";
import { withoutAuthApi } from "./axios";
const language = useTheme.getState().language;
 
export const getGenres = async () => {
  try {
    const response = await withoutAuthApi.get(`/movies/get/genres?language=${language}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMovies = async () => {
  try {
    const response = await withoutAuthApi.get(`/movies?language=${language}`);
    return response.data;
  } catch (error) {
    return error;
  }
};