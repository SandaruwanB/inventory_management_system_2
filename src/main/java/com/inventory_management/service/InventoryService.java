package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Inventory;
import com.inventory_management.repository.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repo;

    public List<Inventory> getInventories(){
        return repo.findAll();
    }

    public Inventory getInventory(int id){
        return repo.findById(id).orElse(null);
    }

    public Inventory saveInventory(Inventory inventory){
        return repo.save(inventory);
    }

    public String deleteInventory(int id){
        repo.deleteById(id);

        return "success";
    }

    public Inventory updateInventory(int id, Inventory inventory){
        Inventory existing = repo.findById(id).orElse(null);

        existing.setProdctname(inventory.getProdctname());
        existing.setOnhandqty(inventory.getOnhandqty());
        existing.setUnitprice(inventory.getUnitprice());
        existing.setUnitofmesure(inventory.getUnitofmesure());

        return repo.save(existing);
    }
}
