package com.inventory_management.repository;

import java.util.List;

import com.inventory_management.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByType(String type);
}
