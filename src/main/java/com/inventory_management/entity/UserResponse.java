package com.inventory_management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private int id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String phone;
    private String address;
    private String role;
    private Date createdAt;
    private Date updatedAt;

    // Constructor to create UserResponse from User entity (excluding password)
    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.role = user.getRole();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}
