package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Suplier;
import com.inventory_management.service.SuplierService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/supliers")
public class SuplierController {
    
    @Autowired
    private SuplierService service;

    @GetMapping("/all")
    public List<Suplier> getAll() {
        return service.getSupliers();
    }

    @GetMapping("/get/{id}")
    public Suplier getSuplier(@PathVariable int id) {
        return service.getSuplier(id);
    }
    
    @PostMapping("/add")
    public Suplier saveSuplier(@RequestBody Suplier suplier) {
        return service.saveSuplier(suplier);
    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteSuplier(@PathVariable int id){
        return service.removeSuplier(id);
    }

    @PutMapping("/update/{id}")
    public Suplier updateSuplierDetails(@PathVariable int id, @RequestBody Suplier suplier) {        
        return service.updateSuplier(id, suplier);
    }
}
