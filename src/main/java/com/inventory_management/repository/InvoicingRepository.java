package com.inventory_management.repository;

import com.inventory_management.entity.Invoicing;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoicingRepository extends JpaRepository<Invoicing, Integer> {
}
