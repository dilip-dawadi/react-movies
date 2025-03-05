import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEntertainmentContext } from "../../contextApi/Context";
import Spinner from "../Spinner";
import Search from "./Search";

export const HeroSection = () => {
  const { movies, tvShows, loading } = useEntertainmentContext();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const slides = useMemo(() => {
    return [...getRandomItems(movies, 3), ...getRandomItems(tvShows, 2)];
  }, [movies, tvShows, loading]);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <header className=" w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div className="relative group flex w-full h-64 md:h-96">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-white text-xl bg-black/40 bg-opacity-75"
          >
            <Spinner />
          </motion.div>
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={slides[current]?.id}
              initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-full bg-contain bg-center flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${slides[current]?.poster})`,
              }}
            ></motion.div>
          </AnimatePresence>
        )}
        <div className="absolute group-hover:flex inset-0 bg-black/50 hidden flex-col justify-center items-center text-center px-6">
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
