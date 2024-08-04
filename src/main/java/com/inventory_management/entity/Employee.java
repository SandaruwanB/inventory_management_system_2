package com.inventory_management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String firstname;
    private String lastname;
    private String gender;
    private String jobtitle;
    private String contact;
    private String addressline1;
    private String addressline2;
    private String city;
    private String postalcode;
    private String epfnumber;
    private String nic;
    private Integer is_working;

}
