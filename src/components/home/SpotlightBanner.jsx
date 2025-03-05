import React, { useMemo } from "react";
import { useEntertainmentContext } from "../../contextApi/Context";

const SpotlightBanner = () => {
  const { movies, tvShows, actors, loading } = useEntertainmentContext();

  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const slides = useMemo(() => {
    return [...getRandomItems(movies, 3), ...getRandomItems(tvShows, 2)];
  }, [movies, tvShows, loading]);
  return (
    <div>
      <div className="my-10 w-full grid grid-cols-8 bg-dark-100 rounded-lg overflow-hidden shadow-lg">
        <div className="col-span-3 flex items-center p-4">
          <h1 className="text-white font-bold">
            ACTOR'S <span className="text-gradient">SPOTLIGHT</span>
          </h1>
        </div>
        {actors.map((_, index) => (
          <div key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${_.image}`}
              alt={`Actor `}
              className="w-full h-52 object-cover"
            />
          </div>
        ))}
      </div>
      <div className="my-10 w-full grid grid-cols-8 bg-dark-100 rounded-lg overflow-hidden shadow-lg">
        <div className="col-span-3 flex items-center p-4">
          <h1 className="text-white font-bold flex flex-col gap-0">
            $5.99 <span className="text-yellow-400 text-5xl">CINEMA</span>
            <span className="text-gradient text-5xl">SPOTLIGHT</span>
          </h1>
        </div>
        {slides.map((_, index) => (
          <div key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${_.poster}`}
              alt={`Actor `}
              className="w-full h-52 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotlightBanner;
