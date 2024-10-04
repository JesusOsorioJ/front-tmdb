import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const loadingStore = create(
  persist(
    (set) => ({
      loading: false,
      setLoading: (value) =>
        set(() => ({
          loading: value,
        })),
    }),
    { name: "loading" }
  )
);

export const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      isAuth: false,
      email: "",
      errors: null,
      setToken: (data) =>
        set(() => ({
          token: data.token,
          email: data.email,
          isAuth: true,
        })),
      setError: (dataState) =>
        set(() => ({
            errors: dataState,
        })),
      logout: () => {
        set(() => ({
          token: "",
          isAuth: false,
          email: "",
        }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
