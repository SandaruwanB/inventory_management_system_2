package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Inventory;
import com.inventory_management.service.InventoryService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/inventory")
public class InventoryController {
    
    @Autowired
    private InventoryService service;


    @GetMapping("/all")
    public List<Inventory> getAll() {
        return service.getInventories();
    }

    @GetMapping("/get/{id}")
    public Inventory getSingle(@PathVariable int id) {
        return service.getInventory(id);
    }
    
    @PostMapping("/add")
    public Inventory saveItem(@RequestBody Inventory inventory) {        
        return service.saveInventory(inventory);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable int id){
        return service.deleteInventory(id);
    }

    @PutMapping("/update/{id}")
    public Inventory updateInventoryDetails(@PathVariable int id, @RequestBody Inventory inventory) {
        return service.updateInventory(id, inventory);
    }
    
}
