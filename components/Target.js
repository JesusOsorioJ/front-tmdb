import { useAuthStore } from "@/store";
import { Favorite, Porcentage } from "./Icons";
import { format } from "date-fns";
import Link from "next/link";

export default function Target({ data, selectFavorite, favorite = false }) {
  const url_image = "https://media.themoviedb.org/t/p/w440_and_h660_face";
  const { isAuth } = useAuthStore((state) => state);

  return (
    <div className="w-[220px] bg-[var(--bg-color2)] rounded-lg shadow-md overflow-hidden">
      <Link href={isAuth ? `/details/${data.id}` : "/"}>
        <img
          className="w-full h-64 object-cover"
          src={`${url_image}${data.poster_path}`}
          alt="Lord of War"
        />
      </Link>

      <div className="p-4">
        <p className="text-xl font-semibold">{data.title ?? "Name"}</p>

        <p className="text-sm mb-4">
          {format(
            data.release_date != "" ? data.release_date : "March 10, 2024",
            "MMMM dd, yyyy"
          )}
        </p>

        {isAuth && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 items-center">
              <p>Rating</p>
              <Porcentage
                value={parseInt(data.vote_average)}
                circle="40px"
                text="12px"
              />
            </div>
            {favorite ? (
              <button
                className="p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]"
                onClick={selectFavorite}
              >
                Quitar
              </button>
            ) : (
              <div className="flex flex-col gap-1 items-center">
                <span className="">Favorites</span>
                <button onClick={selectFavorite}>
                  <Favorite checked={data.favorite} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
