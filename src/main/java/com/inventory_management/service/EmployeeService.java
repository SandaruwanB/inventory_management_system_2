package com.inventory_management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Employee;
import com.inventory_management.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public Employee saveEmployee(Employee employee){
        return repo.save(employee);
    }

    public List<Employee> getEmployees(){
        return repo.findAll();
    }

    public Employee getEmployee(int id){
        return repo.findById(id).orElse(null);
    }

    public String removeEmployee(int id){
        repo.deleteById(id);

        return "success";
    }

    public Employee updateEmployee(Employee employee, int id){
        Employee existing = repo.findById(id).orElse(null);

        existing.setFirstname(employee.getFirstname());
        existing.setLastname(employee.getLastname());
        existing.setEmail(employee.getEmail());
        existing.setGender(employee.getGender());
        existing.setJobtitle(employee.getJobtitle());
        existing.setContact(employee.getContact());
        existing.setAddressline1(employee.getAddressline1());
        existing.setAddressline2(employee.getAddressline2());
        existing.setCity(employee.getCity());
        existing.setPostalcode(employee.getPostalcode());
        existing.setEpfnumber(employee.getEpfnumber());
        existing.setIs_working(employee.getIs_working());
        existing.setNic(employee.getNic());

        return repo.save(existing);
    }
}
