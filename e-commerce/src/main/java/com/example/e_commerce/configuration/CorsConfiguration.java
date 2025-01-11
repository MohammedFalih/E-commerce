package com.example.e_commerce.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@SuppressWarnings("null") CorsRegistry corsRegistry) {
                corsRegistry.addMapping("/**").allowedOrigins("http://localhost:4200")
                        .allowedMethods("*").allowedHeaders("*").allowCredentials(true);
            }
        };
    }
}
