package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Customer;
import com.inventory_management.repository.CustomerRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository repo;

    @PersistenceContext
    private EntityManager entityManager;

    public Customer saveCustomer(Customer customer){
        return repo.save(customer);
    }

    public List<Customer> getCustomers(){
        return repo.findAll();
    }

    public Customer getCustomer(int id){
        return repo.findById(id).orElse(null);
    }

    public String deleteCustomer(int id){
        repo.deleteById(id);
        return "success";
    }

    public Customer updateCustomer (int id, Customer customer){
        Customer existing = repo.findById(id).orElse(null);

        existing.setFirstname(customer.getFirstname());
        existing.setLastname(customer.getLastname());
        existing.setEmail(customer.getEmail());
        existing.setCompanyname(customer.getCompanyname());
        existing.setContact(customer.getContact());
        existing.setGender(customer.getGender());
        existing.setAddressline1(customer.getAddressline1());
        existing.setAddressline2(customer.getAddressline2());
        existing.setCity(customer.getCity());
        existing.setPostalcode(customer.getPostalcode());

        return repo.save(existing);

    }
}
