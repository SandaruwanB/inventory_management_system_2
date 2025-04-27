package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.User;
import com.inventory_management.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/add")
    public User saveProduct(@RequestBody User user) {
        return service.saveUser(user);
    }
    
    @GetMapping("/all")
    public List<User> getAll() {
        return service.getUsers();
    }

    @GetMapping("/get/{id}")
    public User getById(@PathVariable int id) {
        return service.getUser(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id){
        return service.deleteUser(id);
    }

    @PutMapping("/update/{id}")
    public User updateUserDetails(@PathVariable int id, @RequestBody User user) {
        return service.updateUser(id, user);
    }

    @PutMapping("/change/password/{id}")
    public String changePassword(@PathVariable int id, @RequestBody User user) {
        return service.changePassword(id, user);
    }
    
}
