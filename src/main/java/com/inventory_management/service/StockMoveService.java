package com.inventory_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.repository.StockMoveRepository;

@Service
public class StockMoveService {
    
    @Autowired
    private StockMoveRepository repo;

    public String removeMove(int id){
        repo.deleteById(id);        
        return "success";
    }

}
