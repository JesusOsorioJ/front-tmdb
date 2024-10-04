import { useAuthStore, loadingStore } from '@/store';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Crear instancia de axios con token
export const authApi = axios.create({ baseURL: API_URL });

authApi.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  config.headers["access-control-allow-origin"] = "*";
  return config;
});

// Interceptor de respuesta para manejar errores 401
authApi.interceptors.response.use(
  (response) => response, // Devolver la respuesta si es exitosa
  async (error) => {
    const { status } = error.response;

    if (status === 401) {
      // Si la respuesta es 401, llamar a logout y limpiar el estado de autenticación
      const { logout } = useAuthStore.getState();
      logout();
      const { setLoading } = loadingStore.getState();
      setLoading(false);
    }
    return Promise.reject(error);
  }
);

// Sin autenticación
export const withoutAuthApi = axios.create({ baseURL: API_URL });

withoutAuthApi.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["access-control-allow-origin"] = "*";
  return config;
});
