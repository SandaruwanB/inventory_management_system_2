package com.inventory_management.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "supliers")
public class Suplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;
    private String lastname;
    private String email;
    private String contact;
    private String companyname;
    private String addressline1;
    private String addressline2;
    private String city;
    private String postalcode;

    @JsonIgnore
    @OneToMany(mappedBy = "suplier")
    private List<Payment> payments;

    @JsonIgnore
    @OneToMany(mappedBy = "suplier")
    private List<GRN> grn;

    @JsonIgnore
    @OneToMany(mappedBy = "suplier")
    private List<Order> orders;
    
}
