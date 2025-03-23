package com.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory_management.entity.User;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByUsername(String username);
    // List<User> findByEmail(String email);
    Optional<User> findByEmail(String email);
}
