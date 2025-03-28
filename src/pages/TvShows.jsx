import { useEntertainmentContext } from "../contextApi/Context";
import MovieCard from "../components/reuse/MovieCard";
import Spinner from "../components/Spinner";
import Search from "../components/home/Search";
import { Button } from "../components/reuse/Button";
import { Filter } from "lucide-react";
import FilterCom from "../components/Filter";
import { Modal } from "../components/reuse/Modal";
import { useState } from "react";

const TvShows = () => {
  const { tvShows, loading, error } = useEntertainmentContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <section className="all-shows">
          <div className="flex max-md:flex-col max-md:items-start items-center justify-between">
            <h2 className="mt-5 ">All Tv Shows</h2>
            <div className="inline-flex flex-2 items-center justify-end">
              <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search through thousands of tv shows"
              />
              <Button
                className={
                  "ml-2 bg-dark-100 drop-shadow-2xl rounded-lg mt-5 py-5 px-5"
                }
                onClick={() => setIsModalOpen(true)}
                label={
                  <div className="flex gap-2">
                    <Filter />
                    Filter
                  </div>
                }
              />
            </div>
            <Modal
              onModalClose={() => setIsModalOpen(false)}
              isModalOpen={isModalOpen}
              className="text-dark-100"
            >
              <FilterCom show={"Tv Show"} />
            </Modal>
          </div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">Something went run</p>
          ) : (
            <ul>
              {tvShows.map((tvShow) => (
                <MovieCard key={tvShow.id} data={tvShow} shows={"tvShow"} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default TvShows;
