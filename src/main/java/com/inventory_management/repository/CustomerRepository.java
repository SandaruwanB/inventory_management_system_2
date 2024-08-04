package com.inventory_management.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory_management.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
