import { useAuthStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ setView, view, buttons = true }) {
  const { isAuth, logout, email } = useAuthStore((state) => state);
  const router = useRouter

  return (
    <nav className="flex justify-between items-center p-4 bg-black">
      <div className="flex space-x-4 items-center">
        <Link href="/" className="text-2xl font-bold">QUICKBET MOVIES</Link>
        {isAuth && buttons && (
          <>
            <button
              onClick={() => setView("popular")}
              className={`hover:text-[#F0B90B] ${
                view == "popular" ? "p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]" : ""
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setView("favorites")}
              className={`hover:text-[#F0B90B] ${
                view == "favorites" ? "p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]" : ""
              }`}
            >
              Favorites
            </button>
          </>
        )}
      </div>
      <div className="flex space-x-4 items-center">
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
        <Theme />
        <Language />
      </div>
    </nav>
  );
}

const Theme = () => {
  const [dark, setDark] = useState(false);
  return (
    <button
      className={`flex items-center w-[50px] h-[30px] rounded-[50px] text-[25px] 
        ${dark ? "justify-end bg-[#4caf50]" : "justify-start bg-[#ccc]"}`}
      onClick={() => setDark(!dark)}
    >
      <div>{dark ? "🌙" : "☀️"}</div>
    </button>
  );
};

const Language = () => {
  const [language, setLanguage] = useState("es");
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLanguage("es")}
        className={`${
          language == "es" ? "border border-white p-1 rounded-md" : ""
        }`}
      >
        Español
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`${
          language == "en" ? "border border-white p-1 rounded-md" : ""
        }`}
      >
        English
      </button>
    </div>
  );
};
