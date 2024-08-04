package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Order;
import com.inventory_management.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService service;

    @GetMapping("/all")
    public List<Order> getAll() {
        return service.getOrders();
    }

    @GetMapping("/get/{id}")
    public Order getOrder(@PathVariable int id) {
        return service.getOrder(id);
    }

    @PostMapping("/add")
    public Order addOrder(@RequestBody Order order) {
        return service.saveOrder(order);
    }

    @DeleteMapping("/delete/{id}")
    public String removeOrder(@PathVariable int id){
        return service.deleteOrder(id);
    }

    @GetMapping("/customer")
    public List<Order> getCustomerOrders() {
        return service.getCustomerOrders();
    }

    @GetMapping("/suplier")
    public List<Order> getSuplierOrders() {
        return service.getSuplierOrders();
    }    
    
    
}
