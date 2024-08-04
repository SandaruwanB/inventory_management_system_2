package com.inventory_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory_management.entity.Payment;
import java.util.List;


public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByPaymenttype(String paymenttype);
}

