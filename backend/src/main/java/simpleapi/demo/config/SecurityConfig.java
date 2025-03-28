package simpleapi.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()  // Allow public API access
                .anyRequest().authenticated()  // Protect other endpoints
            )
            .csrf(csrf -> csrf.disable())  // Disable CSRF for APIs
            .formLogin(form -> form.disable())  // Disable default login form
            .httpBasic(httpBasic -> httpBasic.disable());  // Disable basic auth if not needed

        return http.build();
    }
}
