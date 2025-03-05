import React from "react";
import { useNavigate } from "react-router-dom";
import { useEntertainmentContext } from "../../contextApi/Context";
import Card from "./Card";

const DetailPage = ({ data, shows }) => {
  const { tvShows, movies, loading, error } = useEntertainmentContext();
  const navigate = useNavigate();
  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  return (
    <div className=" w-full min-h-[90vh]">
      <div className="pattern" />
      <div className="wrapper md:flex-row items-center md:items-start px-6 md:px-12 pt-20">
        <img
          src={
            data.poster
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.poster}`
              : "/no-movie.png"
          }
          alt={data.title}
          className="w-64 md:w-80 rounded-lg shadow-lg"
        />

        <div className="md:ml-10 mt-6 md:mt-0 max-w-2xl">
          <h1 className="text-4xl font-bold text-left">{data.title}</h1>
          <div className="flex items-center mt-2 gap-2">
            <p className="text-lg">{data.genre} |</p>
            <p className="text-gray-300">
              {data.releaseYear} •{" "}
              {data.duration
                ? convertMinutesToTime(data.duration)
                : data.seasons}{" "}
              • ⭐ {data.rating}
            </p>
          </div>

          <p className="mt-4 text-lg">{data.synopsis}</p>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
              🎬 Buy Now
            </button>
            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg font-semibold">
              🎬 Rent Now
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-block mt-6 text-blue-400 hover:underline"
          >
            ← Go Back
          </button>
        </div>
      </div>
      <section className="wrapper all-shows">
        <h2>Similar Shows</h2>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">Something went run</p>
        ) : (
          <ul>
            {shows === "movie"
              ? movies
                  .slice(0, 4)
                  .map((movie) => (
                    <Card key={movie.id} data={movie} shows={shows} />
                  ))
              : tvShows
                  .slice(0, 4)
                  .map((movie) => (
                    <Card key={movie.id} data={movie} shows={shows} />
                  ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DetailPage;
