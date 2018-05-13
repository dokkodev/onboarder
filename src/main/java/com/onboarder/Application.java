package com.onboarder;

import org.onboarder.EnableOnboarder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableOnboarder
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
