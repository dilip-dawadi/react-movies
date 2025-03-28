import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EntertainmentProvider } from "./contextApi/Context";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TvShows from "./pages/TvShows";
import HomePage from "./pages/Home";
import NavBar from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import MyProfile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

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
              <Route path="/tvShow/:id" element={<MovieDetails />} />
              <Route
                element={<ProtectedRoute allowedRoles={["USER", "CUSTOMER"]} />}
              >
                <Route path="/myprofile" element={<MyProfile />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </EntertainmentProvider>
    </Router>
  );
};

export default App;
