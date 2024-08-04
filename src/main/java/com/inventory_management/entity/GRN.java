package com.inventory_management.entity;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "grn")
public class GRN {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String grncode;
    private String date;
    private String note;

    @ManyToOne
    @JoinColumn(name = "suplier_id")
    private Suplier suplier;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "grn_id")
    private List<StockMove> movements;
}
