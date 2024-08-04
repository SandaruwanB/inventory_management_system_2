package com.inventory_management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Customer;
import com.inventory_management.service.CustomerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping("/all")
    public List<Customer> getAll() {
        return service.getCustomers();
    }
        
    @PostMapping("/add")
    public Customer addCustomer(@RequestBody Customer customer) {
        return service.saveCustomer(customer);
    }

    @GetMapping("/get/{id}")
    public Customer getMethodName(@PathVariable int id) {
        return service.getCustomer(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public String removeCustomer(@PathVariable int id){
        return service.deleteCustomer(id);
    }

    @PutMapping("/update/{id}")
    public Customer updateCustomerDetails(@PathVariable int id, @RequestBody Customer customer) {
        return service.updateCustomer(id, customer);
    }
}
