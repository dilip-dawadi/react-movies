package simpleapi.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // Try to load .env, fallback to system environment
        try {
            Dotenv dotenv = Dotenv.load();
            String dbUsername = getEnvOrDefault("DB_USERNAME", dotenv);
            String dbPassword = getEnvOrDefault("DB_PASSWORD", dotenv);
            String dbName = getEnvOrDefault("DB_NAME", dotenv);
			
            System.setProperty("DB_USERNAME", dbUsername);
            System.setProperty("DB_PASSWORD", dbPassword);
            System.setProperty("DB_NAME", dbName);
        } catch (Exception e) {
            // If .env is missing, assume we're using system environment variables
            System.out.println(".env not found, falling back to system environment variables");
        }

        SpringApplication.run(DemoApplication.class, args);
    }

    private static String getEnvOrDefault(String key, Dotenv dotenv) {
        String systemValue = System.getenv(key);
		System.out.println( key + ": " + systemValue);
        if (systemValue != null) return systemValue;
        return dotenv.get(key);
    }
}
