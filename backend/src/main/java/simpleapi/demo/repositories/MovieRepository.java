package simpleapi.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import simpleapi.demo.models.Movie;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {
    List<Movie> findByIsTvShow(boolean isTvShow);
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByIsTvShowAndIsFeatured(boolean isTvShow, boolean isFeatured);
}
