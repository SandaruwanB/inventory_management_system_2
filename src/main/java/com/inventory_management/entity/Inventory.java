package com.inventory_management.entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String prodctname;
    private String producttype;
    private long onhandqty;
    private long outqty;
    private long inqty;
    private double unitprice;
    private String unitofmesure;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<StockMove> stockMove;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<OrderMove> ordermove;
}
