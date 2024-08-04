package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Company;
import com.inventory_management.repository.CompanyRepository;

@Service
public class CompanyService {
    
    @Autowired
    private CompanyRepository repo;

    public List<Company> getCompanies(){
        return repo.findAll();
    }

    public Company updateCompany(int id, Company company){
        Company existing = repo.findById(id).orElse(null);

        existing.setCompanyname(company.getCompanyname());
        existing.setAddressline1(company.getAddressline1());
        existing.setAddressline2(company.getAddressline2());
        existing.setCity(company.getCity());
        existing.setContactnumber(company.getContactnumber());
        existing.setCountry(company.getCountry());
        existing.setEmail(company.getEmail());
        existing.setWeb(company.getWeb());

        return repo.save(existing);
    }

    public Company addCompany(Company company){
        return repo.save(company);
    }
}
