package com.inventory_management.repository;

import com.inventory_management.entity.OrderMove;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMoveRepository extends JpaRepository<OrderMove,Integer> {
}
