package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Invoicing;
import com.inventory_management.service.InvoicingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/invoicing")
public class InvoicingController {
    
    @Autowired
    private InvoicingService service; 

    @GetMapping("/all")
    public List<Invoicing> getAll() {
        return service.getInvoicings();
    }

    @GetMapping("/get/{id}")
    public Invoicing getInvoice(@PathVariable int id) {
        return service.getInvoice(id);
    }

    @GetMapping("/all/desc")
    public List<Invoicing> getDesc() {
        return service.sortDesc();
    }
    

    @PostMapping("/add")
    public Invoicing addInvoice(@RequestBody Invoicing invoice) {
        return service.saveInvoice(invoice);
    }

    @DeleteMapping("/delete/{id}")
    public String removeInvoice(@PathVariable int id){
        return service.removeInvoice(id);
    }
    
    @PutMapping("/entry/cancel/{id}")
    public String cancelEntry(@PathVariable int id) {
        return service.cancelEntry(id);
    }

    @PutMapping("/update/{id}")
    public Invoicing putMethodName(@PathVariable int id, @RequestBody Invoicing invoice) {
        return service.updateInvoice(id, invoice);
    }
    
}
