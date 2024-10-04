"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { loadingStore, useAuthStore } from "@/store";
import { Favorite, Porcentage } from "@/components/Icons";
import Header from "@/components/Header";
import { getMovieById, setMovieFavorite } from "@/api/favorites";

export default function PageLogout({ params }) {
  const [data, setData] = useState({ results: [] });
  const { setLoading } = loadingStore((state) => state);
  const { isAuth } = useAuthStore((state) => state);
  const url_image = "https://media.themoviedb.org/t/p/w440_and_h660_face";
  const url_image1 = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resMovies = await getMovieById(params.id);
      if (resMovies.id) setData(resMovies);
      setLoading(false);
    })();
  }, []);

  const selectFavorite = async () => {
    await setMovieFavorite(params.id);
    setData({
      ...data,
      favorite: params.id == data.id ? !data.favorite : data.favorite,
    });
  };

  return (
    <div>
      <Header setView={() => {}} view={() => {}} buttons={false} />

      <div className="relative p-6 flex items-center gap-10 bg-gradient-to-t from-[#000000] to-[#fff0] overflow-hidden">
        <img
          className="absolute top-0 right-0 w-full -z-10"
          src={`${url_image1}/${data.backdrop_path}`}
          alt="Kung Fu Panda"
        />
        <div className="flex flex-col gap-4">
          <img
            src={`${url_image}/${data.poster_path}`}
            className="w-48 rounded-lg"
            alt="Kung Fu Panda"
          />
          <button className="p-2 rounded-md bg-[#F0B90B] text-black">
            Official trailer
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{data.title ?? ""}</h1>
            <div className="flex gap-4">
              <p>
                {format(data.release_date ?? "March 10, 2024", "MMMM dd, yyyy")}{" "}
              </p>
              <p>Duration: 2h 10 min</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Overview:</p>
            <p>{data.overview ?? ""}</p>
          </div>
          <div className="flex gap-10 items-center">
            <div className="flex gap-2 items-center">
              <Porcentage value={data.vote_average ?? 0} />
              <p>User score</p>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <span className="">Favorites</span>
              <button onClick={selectFavorite}>
                <Favorite checked={data.favorite} />
              </button>
            </div>
          </div>

          <div className="flex gap-5 flex-wrap justify-center w-full">
            {data.genres?.map((d, i) => (
              <button
                key={i}
                className="p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]"
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
