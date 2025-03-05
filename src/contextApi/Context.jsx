import { createContext, useState, useEffect, useContext } from "react";

const EntertainmentContext = createContext();

export const EntertainmentProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [featuredTvShows, setFeaturedTvShows] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    "https://my-json-server.typicode.com/dilip-dawadi/react-movies";

  const fetchData = async (type, setState) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${type}`);
      if (!response.ok) throw new Error(`Failed to fetch ${type}`);
      const data = await response.json();
      setState(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchData("movies", setMovies);
    fetchData("tvShows", setTvShows);
    fetchData("actors", setActors);
    fetchData("featuredMovies", setFeaturedMovies);
    fetchData("featuredTvShows", setFeaturedTvShows);
  }, []);

  return (
    <EntertainmentContext.Provider
      value={{
        movies,
        tvShows,
        loading,
        error,
        actors,
        featuredMovies,
        featuredTvShows,
      }}
    >
      {children}
    </EntertainmentContext.Provider>
  );
};

export const useEntertainmentContext = () => useContext(EntertainmentContext);
