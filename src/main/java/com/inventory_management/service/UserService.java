package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.User;
import com.inventory_management.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;


    public User saveUser(User user){
        return repo.save(user);
    }

    public List<User> getUsers(){
        return repo.findAll();
    }

    public User getUser(int id){
        return repo.findById(id).orElse(null);
    }

    public String deleteUser(int id){
        repo.deleteById(id);
        return "success";
    }

    public User updateUser( int id, User user){
        User existig = repo.findById(id).orElse(null);

        existig.setUsername(user.getUsername());
        existig.setEmail(user.getEmail());
        existig.setFirstname(user.getFirstname());
        existig.setLastname(user.getLastname());
        existig.setPhone(user.getPhone());
        existig.setAddress(user.getAddress());
        existig.setRole(user.getRole());
        existig.setUpdatedAt(user.getUpdatedAt());

        if (user.getPassword() != ""){
            existig.setPassword(user.getPassword());
        }

        return repo.save(existig);
    }

    public String changePassword(int id, User user){
        return "success";
    }
}
