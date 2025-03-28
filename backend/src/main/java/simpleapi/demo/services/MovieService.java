package simpleapi.demo.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpleapi.demo.models.Movie;
import simpleapi.demo.repositories.MovieRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(Movie movie) {
        // System.out.println("Movie: " + movie.getTitle() + " | isTvShow: " + movie.isTvShow());
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        List<Movie> movies = movieRepository.findByIsTvShow(false);
        // movies.forEach(movie -> System.out.println("Movie: " + movie.getTitle() + " | isTvShow: " + movie.isTvShow()));
        return movies;
    }

    public List<Movie> getAllTvShows() {
        return movieRepository.findByIsTvShow(true);
    }

    public List<Movie> searchByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Movie> getFeaturedMovies() {
        return movieRepository.findByIsTvShowAndIsFeatured(false, true);
    }

    public List<Movie> getFeaturedTvShows() {
        return movieRepository.findByIsTvShowAndIsFeatured(true, true);
    }

    public Optional<Movie> getMovieById(String id) {
        return movieRepository.findById(id);
    }

    public Movie updateMovie(String id, Movie updatedMovie) {
        return movieRepository.findById(id).map(movie -> {
            movie.setTitle(updatedMovie.getTitle());
            movie.setPrice(updatedMovie.getPrice());
            movie.setSynopsis(updatedMovie.getSynopsis());
            movie.setPoster(updatedMovie.getPoster());  // Updated to use the new poster field
            movie.setRentPrice(updatedMovie.getRentPrice());
            movie.setPurchasePrice(updatedMovie.getPurchasePrice());
            movie.setIsFeatured(updatedMovie.isFeatured());
            
            // Handle seasons or duration based on isTvShow flag
            if (updatedMovie.isTvShow()) {
                movie.setSeasons(updatedMovie.getSeasons());
                movie.setDuration(0);  // Set duration to 0 for TV shows
            } else {
                movie.setDuration(updatedMovie.getDuration());
                movie.setSeasons(0);  // Set seasons to 0 for movies
            }
            
            return movieRepository.save(movie);
        }).orElse(null);
    }

    public boolean deleteMovie(String id) {
        return movieRepository.findById(id).map(movie -> {
            movieRepository.delete(movie);
            return true;
        }).orElse(false);
    }
}
