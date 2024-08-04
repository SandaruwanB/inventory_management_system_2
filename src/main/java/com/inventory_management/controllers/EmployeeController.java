package com.inventory_management.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Employee;
import com.inventory_management.service.EmployeeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping("/all")
    public List<Employee> getAll() {
        return service.getEmployees();
    }

    @GetMapping("/get/{id}")
    public Employee getSingle(@PathVariable int id) {
        return service.getEmployee(id);
    }

    @PostMapping("/add")
    public Employee saveEmployee(@RequestBody Employee employee) {     
        return service.saveEmployee(employee);
    }
    
    @DeleteMapping("/delete/{id}")
    public String removeEmployee(@PathVariable int id){
        return service.removeEmployee(id);
    }

    @PutMapping("/update/{id}")
    public Employee updateEmployeeData(@PathVariable int id, @RequestBody Employee employee) {
        return service.updateEmployee(employee, id);
    }
    
}
