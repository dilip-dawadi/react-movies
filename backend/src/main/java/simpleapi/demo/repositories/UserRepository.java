package simpleapi.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import simpleapi.demo.models.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
