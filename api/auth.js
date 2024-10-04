import { withoutAuthApi } from "./axios";

export const login = async (userData) => {
  try {
    const response = await withoutAuthApi.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await withoutAuthApi.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error
  }
};