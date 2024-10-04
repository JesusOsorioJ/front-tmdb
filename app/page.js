"use client";
import Header from "@/components/Header";
import { Loading } from "@/components/Icons";
import Login from "@/components/Login";
import PageFavorites from "@/components/PageFavorites";
import PageLogin from "@/components/PageLogin";
import PageLogout from "@/components/PageLogout";
import Register from "@/components/Register";
import { useAuthStore, loadingStore, useTheme } from "@/store";
import { useState } from "react";

export default function Home() {
  const { isAuth } = useAuthStore((state) => state);
  const { loading } = loadingStore((state) => state);
  const { isDarkMode } = useTheme();
  const [view, setView] = useState("popular");

  return (
    <div
      id={isDarkMode ? "dark" : ""}
      className="text-[var(--text-color)] placeholder-[var(--text-color)]"
    >
      {loading && <Loading />}
      <Header setView={setView} view={view} />
      <div className="relative">
        {view == "login" && <Login setView={setView} />}
        {view == "register" && <Register setView={setView} />}
        {isAuth ? (
          <>{view == "popular" ? <PageLogin /> : <PageFavorites />}</>
        ) : (
          <PageLogout />
        )}
      </div>
    </div>
  );
}
