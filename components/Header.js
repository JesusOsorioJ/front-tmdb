import { useAuthStore, useTheme } from "@/store";
import Link from "next/link";
import { useState } from "react";

export default function Header({ setView, view, buttons = true }) {
  const { isAuth, logout, email } = useAuthStore((state) => state);
  const { isDarkMode, toggleDarkMode, setLanguage, language } = useTheme();

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center gap-7 p-4 bg-black text-white">
      <div className="flex space-x-4 items-center">
        <Link href="/" className="text-2xl font-bold">
          QUICKBET MOVIES
        </Link>
        {isAuth && buttons && (
          <>
            <button
              onClick={() => setView("popular")}
              className={`hover:text-[#F0B90B] ${
                view == "popular"
                  ? "p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]"
                  : ""
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setView("favorites")}
              className={`hover:text-[#F0B90B] ${
                view == "favorites"
                  ? "p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]"
                  : ""
              }`}
            >
              Favorites
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {isAuth ? (
          <div className="flex gap-3 items-center">
            <p>{email}</p>
            <button
              onClick={logout}
              className="p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setView("login")}
              className={`hover:text-[#F0B90B]`}
            >
              Login
            </button>
            <button
              onClick={() => setView("register")}
              className="hover:text-[#F0B90B]"
            >
              Register
            </button>
          </>
        )}
        <div className="flex gap-2 space-x-4 items-center">
          <button
            className={`flex items-center w-[50px] h-[30px] rounded-[50px] text-[25px] 
        ${isDarkMode ? "justify-end bg-[#4caf50]" : "justify-start bg-[#ccc]"}`}
            onClick={() => toggleDarkMode(!isDarkMode)}
          >
            <div>{isDarkMode ? "🌙" : "☀️"}</div>
          </button>
          <Language setLanguage={setLanguage} language={language} />
        </div>
      </div>
    </nav>
  );
}

const Language = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => {
          setLanguage("es");
          location.reload();
        }}
        className={`${
          language == "es" ? "border border-white p-1 rounded-md" : ""
        }`}
      >
        Español
      </button>
      <button
        onClick={() => {
          setLanguage("en");
          location.reload();
        }}
        className={`${
          language == "en" ? "border border-white p-1 rounded-md" : ""
        }`}
      >
        English
      </button>
    </div>
  );
};
