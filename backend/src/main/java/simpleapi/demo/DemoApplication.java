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

			System.setProperty("DB_USERNAME", getEnvOrDefault("DB_USERNAME", dotenv));
			System.setProperty("DB_PASSWORD", getEnvOrDefault("DB_PASSWORD", dotenv));
			System.setProperty("DB_NAME", getEnvOrDefault("DB_NAME", dotenv));
		} catch (Exception e) {
			// If .env is missing, assume we're using system environment variables (e.g., on Render)
			System.out.println(".env not found, falling back to system environment variables");
		}

		SpringApplication.run(DemoApplication.class, args);
	}

	private static String getEnvOrDefault(String key, Dotenv dotenv) {
		String systemValue = System.getenv(key);
		if (systemValue != null) return systemValue;
		return dotenv.get(key);
	}
}
