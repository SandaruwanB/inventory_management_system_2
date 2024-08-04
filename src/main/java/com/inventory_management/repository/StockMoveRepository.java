package com.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory_management.entity.StockMove;

public interface StockMoveRepository extends JpaRepository<StockMove, Integer> {
}
