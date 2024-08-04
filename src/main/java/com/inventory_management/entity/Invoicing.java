package com.inventory_management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoicing")
public class Invoicing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String invoicenumber;
    private String note;
    private String date;
    private double amount;
    private String status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
