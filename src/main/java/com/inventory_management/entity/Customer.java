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
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;
    private String lastname;
    private String email;
    private String companyname;
    private String contact;
    private String gender;
    private String addressline1;
    private String addressline2;
    private String city;
    private String postalcode;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Payment> payments;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Invoicing> invoices;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Order> orders;
}

