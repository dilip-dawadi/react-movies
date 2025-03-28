import React, { useState, useEffect, useRef } from "react";
import api from "../../API";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const Search = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search movies...",
}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Debounce effect (fetch after user stops typing)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchMovies();
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Fetch movies using Axios
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/movies/search?title=${searchTerm}`); // Adjust endpoint as needed
      setResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setResults([]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  return (
    <div className="search relative" ref={dropdownRef}>
      <div className="relative flex items-center">
        <img
          src="/search.svg"
          alt="search"
          className="absolute left-2 h-5 w-5"
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowDropdown(true)}
        />
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-dark-100 py-2 shadow-lg z-50 rounded-md mt-1 max-h-64 overflow-y-auto">
          {loading ? (
            <div className="h-16 flex justify-center items-center">
              <Spinner />
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col items-start space-y-10">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center justify-center p-2 space-x-10 cursor-pointer w-full"
                  onClick={() =>
                    navigate(
                      `/${movie.isTvShow ? "tvShow" : "movie"}/${movie.id}`
                    )
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster}`}
                    alt={movie.title}
                    className="w-14 h-20 object-cover object-center rounded-md"
                  />
                  <div className="text-sm flex-1 flex items-start flex-col">
                    <span>{movie.title}</span>
                    <span>
                      {" "}
                      {movie?.releaseYear} •{" "}
                      {movie?.duration
                        ? convertMinutesToTime(movie?.duration)
                        : movie?.seasons}{" "}
                      • ⭐ {movie?.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm h-16 flex items-center justify-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
