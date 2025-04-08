import { createContext, useState, useEffect, useContext } from "react";
import api from "../API";
import { getAuthStatus } from "../utils/authUtils";
import { toast } from "react-toastify";

const EntertainmentContext = createContext();
export const useEntertainmentContext = () => useContext(EntertainmentContext);

export const EntertainmentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [featuredTvShows, setFeaturedTvShows] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthModelOpen, setIsAuthModelOpen] = useState(false);

  const fetchData = async (type, setState) => {
    try {
      setLoading(true);
      const response = await api.get(`/${type}`);
      setState(response.data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const isLoggedIn = getAuthStatus();
    async function fetchUser() {
      if (isLoggedIn && user === null) {
        setLoading(true);
        try {
          const { data } = await api.get("/auth/fetch-user");
          setUser(data);
        } catch (error) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("welcome");
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    fetchData("movies", setMovies);
    fetchData("movies/tvshows", setTvShows);
    fetchData("movies/actors", setActors);
    fetchData("movies/featured", setFeaturedMovies);
    fetchData("movies/featured/tvshows", setFeaturedTvShows);
  }, []);

  const logout = async () => {
    try {
      console.log("logout success");
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logout Success");
      localStorage.setItem("isLoggedIn", "false");
    } catch (error) {
      toast.warn("Logout Failed");
      console.log("error");
    }
  };

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
        user,
        setUser,
        logout,
        isAuthModelOpen,
        setIsAuthModelOpen,
      }}
    >
      {children}
    </EntertainmentContext.Provider>
  );
};
