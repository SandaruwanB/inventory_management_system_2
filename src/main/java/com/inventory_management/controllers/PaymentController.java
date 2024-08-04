package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Payment;
import com.inventory_management.service.PaymentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/payments")
public class PaymentController {
    
    @Autowired
    private PaymentService service;

    @PostMapping("/add")
    public Payment savePayment(@RequestBody Payment payment) {
        return service.createPayment(payment);
    }

    @GetMapping("/customer")
    public List<Payment> getCustomerPayments() {
        return service.getCustomerPayments();
    }

    @GetMapping("/suplier")
    public List<Payment> getSuplierPayments() {
        return service.getSuplierPayments();
    }   

    @GetMapping("/all")
    public List<Payment> getAll() {
        return service.getPayments();
    }

    @GetMapping("/all/desc")
    public List<Payment> getDescPayments() {
        return service.sortDesc();
    }
    

    @GetMapping("/get/{id}")
    public Payment getPayment(@PathVariable int id) {
        return service.getPayment(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public String removePayment(@PathVariable int id){
        return service.removePayment(id);
    }

    @PutMapping("/entry/cancel/{id}")
    public String putMethodName(@PathVariable int id) {
        return service.cancelEntry(id);
    }

    @PutMapping("/update/{id}")
    public Payment putMethodName(@PathVariable int id, @RequestBody Payment payment) {
        return service.updatePayment(id, payment);
    }
    
}
