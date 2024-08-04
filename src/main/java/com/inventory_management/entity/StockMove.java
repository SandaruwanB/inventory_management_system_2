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
@Table(name = "stock_movements")
public class StockMove {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private float quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Inventory product;
}
