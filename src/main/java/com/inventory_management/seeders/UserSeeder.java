package com.inventory_management.seeders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.inventory_management.entity.User;
import com.inventory_management.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Component
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public UserSeeder(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); 

        String email = "admin@gmail.com";
        String password = encoder.encode("admin@123");

        if (userRepository.findByEmail(email).isPresent()){
            System.out.println("Default user exits");
        } else {
            User admin = new User();
            admin.setEmail(email);
            admin.setUsername("admin");
            admin.setFirstname("admin");
            admin.setLastname("admin");
            admin.setPassword(password);
            admin.setRole("ROLE_USER");
        
            userRepository.save(admin);
            System.out.println("Default user created");
        }
    }
    
}
