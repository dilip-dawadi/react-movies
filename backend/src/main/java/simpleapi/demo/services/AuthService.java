package simpleapi.demo.services;

import simpleapi.demo.models.User;
import simpleapi.demo.repositories.UserRepository;
import simpleapi.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtTokenUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "User already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER"); // Default role
        userRepository.save(user);

        return jwtTokenUtil.generateToken(user.getEmail());
    }

    public Map<String, Object> loginUser(String email, String password) {
        System.err.println(email + " email " + password);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return Map.of("user", user.get(), "token", jwtTokenUtil.generateToken(email));
        }
        return Map.of("error", "Invalid credentials");
    }
    

     // Validate JWT token
    public Boolean validateToken(String token, Optional<User> userDetails) {
        return jwtTokenUtil.validateToken(token, userDetails);
    }

        // Fetch complete user details by email
    public Optional<User> getUserDetailsByEmail(String token) {
        String email =  jwtTokenUtil.extractEmail(token);
        return userRepository.findByEmail(email);
    }
}
