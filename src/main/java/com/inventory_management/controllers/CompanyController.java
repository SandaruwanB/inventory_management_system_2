package com.inventory_management.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory_management.entity.Company;
import com.inventory_management.service.CompanyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/company")
public class CompanyController {
    
    @Autowired
    private CompanyService service;

    @GetMapping("/all")
    public List<Company> getCompany() {
        return service.getCompanies();
    }

    @PutMapping("/update/{id}")
    public Company updateCompany(@PathVariable int id, @RequestBody Company company) {
        return service.updateCompany(id, company);
    }

    @PostMapping("/add")
    public Company saveCompany(@RequestBody Company company) {
        return service.addCompany(company);
    }
    
    
}
