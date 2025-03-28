package simpleapi.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import simpleapi.demo.models.Movie;
import simpleapi.demo.services.MovieService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/tvshows")
    public ResponseEntity<List<Movie>> getAllTvShows() {
        return ResponseEntity.ok(movieService.getAllTvShows());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String title) {
        return ResponseEntity.ok(movieService.searchByTitle(title));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Movie>> getFeaturedMovies() {
        return ResponseEntity.ok(movieService.getFeaturedMovies());
    }

    @GetMapping("/featured/tvshows")
    public ResponseEntity<List<Movie>> getFeaturedTvShows() {
        return ResponseEntity.ok(movieService.getFeaturedTvShows());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable String id) {
        Optional<Movie> movie = movieService.getMovieById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable String id, @RequestBody Movie movie) {
        Movie updatedMovie = movieService.updateMovie(id, movie);
        return updatedMovie != null ? ResponseEntity.ok(updatedMovie) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable String id) {
        return movieService.deleteMovie(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
        @GetMapping("/actors")
    public ResponseEntity<?> getAllActors() {
        List<Map<String, Object>> actors = List.of(
            Map.of("id", 1, "image", "whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg"),
            Map.of("id", 2, "image", "lh1r1bmkEBcI3VR0AeFKGEt7JOr.jpg"),
            Map.of("id", 3, "image", "ts9l18VkDSooRGDWIeQegNVHciC.jpg"),
            Map.of("id", 4, "image", "wdmLUSPEC7dXuqnjTM4NgbjvTKk.jpg"),
            Map.of("id", 5, "image", "4SYTH5FdB0dAORV98Nwg3llgVnY.jpg")
        );
        return ResponseEntity.ok(actors);
    }
}



// Get all movies → GET http://localhost:8080/api/movies

// Search movies by title → GET http://localhost:8080/api/movies/search?title=matrix

// Get featured movies → GET http://localhost:8080/api/movies/featured

// Update a movie → PUT http://localhost:8080/api/movies/{id}

// Delete a movie → DELETE http://localhost:8080/api/movies/{id}