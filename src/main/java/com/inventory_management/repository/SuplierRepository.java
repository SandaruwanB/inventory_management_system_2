package com.inventory_management.repository;

import com.inventory_management.entity.Suplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuplierRepository extends JpaRepository<Suplier, Integer> {
}
