package com.inventory_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.repository.OrderMoveRepository;

@Service
public class OrderMoveService {

    @Autowired
    private OrderMoveRepository repo;

    public String removeOrderLine(int id){
        repo.deleteById(id);        
        return "success";
    }
}
