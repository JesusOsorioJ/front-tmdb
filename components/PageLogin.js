"use client";
import { useEffect, useState } from "react";
import Target from "./Target";
import { DeleteFilter, LoadingIcon, Porcentage } from "./Icons";
import { getGenres } from "@/api/movie";
import { getAllMoviesWithFavorites, setMovieFavorite } from "@/api/favorites";
import Pagination from "./Pagination";
import { loadingStore } from "@/store";
import { format } from "date-fns";

export default function PageLogin() {
  const initData = { results: [], page: 1, total_pages: 1 };
  const initGenre = { id: "", name: "" };
  const [data, setData] = useState(initData);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(initGenre);
  const [keyword, setKeyword] = useState(null);
  const { setLoading } = loadingStore((state) => state);
  const [loadingList, setLoadingList] = useState(false);
  const url_image1 = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resMovies = await getAllMoviesWithFavorites();

      if (resMovies.page) setData(resMovies);
      const resGenres = await getGenres();
      if (resGenres.genres) setGenres(resGenres.genres);
      setLoading(false);
    })();
  }, []);

  const selectGenres = async (data) => {
    setLoadingList(true);
    let resMovies = initData;
    if (data?.id) {
      resMovies = await getAllMoviesWithFavorites(`?genre=${data.id}&page=1`);
    } else {
      resMovies = await getAllMoviesWithFavorites(`?page=1`);
    }
    setKeyword("");
    setGenre(data);
    if (resMovies.page) setData(resMovies);
    setLoadingList(false);
  };

  const selectSearch = async (value) => {
    setLoadingList(true);
    let resMovies = initData;
    if (value != "") {
      resMovies = await getAllMoviesWithFavorites(`?keyword=${value}&page=1`);
    } else {
      resMovies = await getAllMoviesWithFavorites(`page=1`);
    }
    setKeyword(value);
    setGenre(initGenre);
    if (resMovies.page) setData(resMovies);
    setLoadingList(false);
  };

  const handlePageChange = async (page) => {
    setLoadingList(true);
    let resMovies = initData;
    if (keyword) {
      resMovies = await getAllMoviesWithFavorites(
        `?keyword=${keyword}&page=${page}`
      );
    } else if (genre) {
      resMovies = await getAllMoviesWithFavorites(
        `?genre=${genre.id}&page=${page}`
      );
    } else {
      resMovies = await getAllMoviesWithFavorites(`?page=${page}`);
    }
    setData(resMovies);
    setLoadingList(false);
  };

  const selectFavorite = async (value) => {
    await setMovieFavorite(value.id);
    setData({
      ...data,
      results: data.results.map((d) => {
        return {
          ...d,
          favorite: value.id == d.id ? !d.favorite : d.favorite,
        };
      })
    });
  };

  return (
    <div>
      <div className="relative p-6 flex items-end gap-10 min-h-[300px] bg-gradient-to-t from-[#000000] to-[#fff0] overflow-hidden">
        <img
          className="absolute top-0 right-0 w-full -z-10"
          src={`${url_image1}/dvBCdCohwWbsP5qAaglOXagDMtk.jpg`}
          alt=""
        />
        <div className="text-white flex flex-col lg:flex-row w-full gap-6 justify-between items-center ">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <p className="text-4xl font-bold">
                Deadpool & Wolverine
              </p>
              <div className="flex gap-4">
                <p>{format("2024-07-24", "MMMM dd, yyyy")}</p>
                <p>Duration: 2h 10 min</p>
              </div>
            </div>
            <p>A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.</p>
          </div>
          <Porcentage value={7.76} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="flex flex-col gap-5  bg-[var(--bg-color2)] p-10 py-9">
          <div className="flex flex-col gap-2">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => selectSearch(e.target.value)}
              className="w-full p-2 bg-[var(--bg-color3)] rounded-lg text-[var(--text-color)] placeholder-[var(--text-color)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl">Genres</h3>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="--"
                  value={genre?.name ?? null}
                  readOnly
                  className="w-full p-2 bg-[var(--bg-color3)] text-[var(--text-color)] placeholder-[var(--text-color)]"
                />
                <button onClick={() => selectGenres(initGenre)}>
                  <DeleteFilter color="var(--text-color)"/>
                </button>
              </div>

              <div className="flex flex-col items-start p-3 bg-[var(--bg-color3)] max-h-[300px] min-w-[180px] overflow-auto">
                {genres.map((d, i) => (
                  <button
                    className={`${
                      genre?.id == d.id
                        ? "text-left bg-[var(--bg-color4)] p-2 w-full"
                        : "p-1"
                    }`}
                    key={i}
                    onClick={() => selectGenres(d)}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-col gap-[20px] p-10 bg-[var(--bg-color1)] w-full">
          <p className="text-2xl font-bold mx-10">Movies</p>
          {loadingList ? (
            <LoadingIcon />
          ) : (
            <div className="flex flex-wrap justify-center gap-[20px]">
              {data.results.map((d, i) => (
                <Target
                  data={d}
                  key={i}
                  selectFavorite={() => selectFavorite(d)}
                />
              ))}
              {data.results.length == 0&& "No hay resultados para mostrar"}
            </div>
          )}

          <Pagination
            currentPage={data.page}
            totalPages={data.total_pages - 100}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
