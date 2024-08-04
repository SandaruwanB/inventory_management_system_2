package com.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory_management.entity.Employee;

public interface EmployeeRepository extends JpaRepository< Employee,Integer > {
}
