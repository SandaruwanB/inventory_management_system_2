package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.GRN;
import com.inventory_management.service.GrnService;
import com.inventory_management.service.StockMoveService;

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
@RequestMapping("/api/grn")
public class GRNController {
    
    @Autowired
    private GrnService service;

    @Autowired
    private StockMoveService moveService;

    @GetMapping("/all")
    public List<GRN> getGrns() {
        return service.getGrns();
    }

    @GetMapping("/get/{id}")
    public GRN getGrn(@PathVariable int id) {
        return service.getGrn(id);
    }

    @PostMapping("/add")
    public GRN addGrn(@RequestBody GRN grn) { 
        return service.addGrn(grn);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteGrn(@PathVariable int id){
        return service.removeGrn(id);
    }

    @DeleteMapping("/delete/move/{id}")
    public String removeMove(@PathVariable int id){
        return moveService.removeMove(id);
    }

    @PutMapping("/update/{id}")
    public String putMethodName(@PathVariable int id, @RequestBody GRN grn) {
        return service.updateGrn(id, grn);
    }
}
