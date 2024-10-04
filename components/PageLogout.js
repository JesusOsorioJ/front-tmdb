"use client";
import { useEffect, useState } from "react";
import Target from "./Target";
import { getMovies } from "@/api/movie";
import { format } from "date-fns";
import { Porcentage } from "./Icons";
import { loadingStore } from "@/store";

export default function PageLogout() {
  const [data, setData] = useState({ results: [] });
  const { setLoading } = loadingStore((state) => state);
  const url_image = "https://media.themoviedb.org/t/p/w440_and_h660_face";
  const url_image1 = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

  useEffect(() => {
    (async () => {
      setLoading(true)
      const resMovies = await getMovies();
      if(resMovies.results) setData(resMovies);
      setLoading(false)
    })();
  }, []);

  return (
    <div>
      <div className="relative p-6 flex items-center gap-10 bg-gradient-to-t from-[#000000] to-[#fff0] overflow-hidden text-white">
        <img
          className="absolute top-0 right-0 w-full -z-10"
          src={`${url_image1}/dvBCdCohwWbsP5qAaglOXagDMtk.jpg`}
          alt="Kung Fu Panda"
        />
        <div className="hidden xl:flex flex-col gap-4">
          <img
            src={`${url_image}/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg`}
            className="w-48 rounded-lg "
            alt="Kung Fu Panda"
          />
          <button className="p-2 rounded-md bg-[#F0B90B] text-black">
            Official trailer
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">
              Deadpool & Wolverine
            </h1>
            <div className="flex gap-4">
              <p>{format(data.release_date ?? "March 10, 2024", "MMMM dd, yyyy")}{" "}</p>
              <p>Duration: 2h 10 min</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Overview:</p>
            <p>A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.</p>
          </div>

          <div className="flex gap-2 items-center">
            <Porcentage value={7}/>
            <p>User score</p>
          </div>
          <div className="flex gap-5 flex-wrap justify-center w-full">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <button
                  key={i}
                  className="p-2 border-2 rounded-md border-[#F0B90B] text-[#F0B90B]"
                >
                  Category
                </button>
              ))}
          </div>
        </div>
      </div>

      <main className="flex flex-col gap-[20px] p-10 bg-[var(--bg-color1)]">
          <p className="text-2xl font-bold mx-10">Movies</p>
          <div className="flex flex-wrap justify-center gap-[20px]">
            {data.results.map((d, i) => (
              <Target data={d} key={i} />
            ))}
          </div>
      </main>
    </div>
  );
}
