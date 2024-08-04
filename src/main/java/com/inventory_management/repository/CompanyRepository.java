package com.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory_management.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
}
