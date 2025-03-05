import { ArrowUpRight } from "lucide-react";
import Spinner from "../components/Spinner.jsx";
import Card from "../components/reuse/Card.jsx";
import { useEntertainmentContext } from "../contextApi/Context.jsx";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/home/Hero.jsx";
import SpotlightBanner from "../components/home/SpotlightBanner.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { movies, tvShows, featuredTvShows, featuredMovies, loading, error } =
    useEntertainmentContext();

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <HeroSection />

        {featuredMovies.length > 0 && (
          <section className="featured">
            <h2>Featured Movies</h2>

            <ul>
              {featuredMovies?.slice(0, 6).map((movie, index) => (
                <li key={index}>
                  <p>{index + 1}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster}`}
                    alt={movie.id}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-shows">
          <div className="flex justify-between w-full items-center">
            <h2>Movies</h2>
            <NavigateButton navigate={navigate} url={"/movies"} />
          </div>

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">Something went run</p>
          ) : (
            <ul>
              {movies?.slice(0, 4).map((movie) => (
                <Card key={movie.id} data={movie} shows={"movie"} />
              ))}
            </ul>
          )}
        </section>

        {featuredTvShows.length > 0 && (
          <section className="featured">
            <h2>Featured TV Shows</h2>

            <ul>
              {featuredTvShows?.slice(0, 6).map((tvShow, index) => (
                <li key={index}>
                  <p>{index + 1}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvShow.poster}`}
                    alt={tvShow.id}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-shows">
          <div className="flex justify-between w-full items-center">
            <h2>TV Shows</h2>
            <NavigateButton navigate={navigate} url={"/tvShows"} />
          </div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">Something went run</p>
          ) : (
            <ul>
              {tvShows?.slice(0, 4).map((tvShow) => (
                <Card key={tvShow.id} data={tvShow} shows={"tvShow"} />
              ))}
            </ul>
          )}
        </section>
        <SpotlightBanner />
      </div>
    </main>
  );
};

export default Home;

const NavigateButton = ({ navigate, url }) => {
  return (
    <button
      className="py-2 px-2 cursor-pointer space-x-2 border border-r-4 hover:bg-dark-100 flex"
      onClick={() => navigate(url)}
    >
      <span>View more</span>
      <ArrowUpRight />
    </button>
  );
};
