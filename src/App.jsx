import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EntertainmentProvider } from "./contextApi/Context";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TvShows from "./pages/TvShows";
import TvShowDetails from "./pages/TvShowDetails";
import HomePage from "./pages/Home";
import NavBar from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <EntertainmentProvider>
        <div className="min-h-screen text-white flex flex-col justify-between">
          <main className="flex-grow">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tvShows" element={<TvShows />} />
              <Route path="/tvShow/:id" element={<TvShowDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </EntertainmentProvider>
    </Router>
  );
};

export default App;
