package com.inventory_management.repository;

import com.inventory_management.entity.GRN;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GRNRepository extends JpaRepository<GRN, Integer> {
}
