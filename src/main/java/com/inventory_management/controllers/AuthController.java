package com.inventory_management.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api")
public class AuthController {
    
    @PostMapping("/login")
    public String postMethodName(@RequestBody String entity) {
        return entity;
    }
    
}
