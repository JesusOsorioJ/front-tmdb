import { useEffect, useState } from "react";
import Target from "./Target";
import { getMoviesFavorite, setMovieFavorite } from "@/api/favorites";
import { loadingStore } from "@/store";

export default function PageFavorites() {
  const [data, setData] = useState([]);
  const { setLoading } = loadingStore((state) => state);

  useEffect(() => {
    getFavoritesMovie();
  }, []);

  const getFavoritesMovie = async() =>{
    setLoading(true)
    const resMovies = await getMoviesFavorite();
    setData(resMovies); 
    setLoading(false)
  }


  const selectFavorite = async (data) => {
    await setMovieFavorite(data.id);
    await getFavoritesMovie();
  };

  return (
    <div className="flex flex-col gap-[20px] p-10 bg-[var(--bg-color1)] w-full">
      <p className="text-2xl font-bold mx-10">Favorites</p>
      <div className="flex flex-wrap gap-[20px]">
        {data.map((d, i) => (
          <Target
            data={d}
            key={i}
            selectFavorite={() => selectFavorite(d)}
            favorite={true}
          />
        ))}
        {data.length == 0&& "No hay resultados para mostrar"}
      </div>
    </div>
  );
}
