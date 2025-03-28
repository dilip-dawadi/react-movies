package simpleapi.demo.controllers;

import simpleapi.demo.models.User;
import simpleapi.demo.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/user")
    public ResponseEntity<User> getUserInfo(HttpServletRequest request) {
        String token = getJwtFromCookies(request);
        if (token == null) {
            return ResponseEntity.status(401).build();
        }
    
        Optional<User> user = authService.getUserDetailsByEmail(token);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String token = authService.registerUser(user);
        return token.equals("User already exists") ? ResponseEntity.badRequest().body(token) : ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        System.err.println(credentials.get("email") + " dd" + credentials.get("password"));
        Map<String, Object> loginResponse = authService.loginUser(credentials.get("email"), credentials.get("password"));
    
        if (loginResponse.containsKey("error")) {
            return ResponseEntity.status(401).body(loginResponse.get("error"));
        }
    
        // Extract token
        String token = (String) loginResponse.get("token");
    
        // Create and set the cookie
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);  // 1 day
    
        response.addCookie(cookie);
        return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        // Invalidate the JWT cookie
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately

        response.addCookie(cookie);

        return ResponseEntity.ok("Logout successful");
    }
    // Helper method to extract JWT token from cookies
    
    private String getJwtFromCookies(HttpServletRequest request) {
      Cookie[] cookies = request.getCookies();
      if (cookies == null) {
        return null;  // No cookies in request
      }
      for (Cookie cookie : cookies) {
        if ("jwt".equals(cookie.getName())) {
            return cookie.getValue();
        }
      }
     return null;  // No JWT token in cookies
    }
}
