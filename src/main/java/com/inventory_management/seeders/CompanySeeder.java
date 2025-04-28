package com.inventory_management.seeders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.inventory_management.entity.Company;
import com.inventory_management.repository.CompanyRepository;

@Component
public class CompanySeeder implements CommandLineRunner  {
    private final CompanyRepository companyRepository;

    public CompanySeeder(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    @Override
    public void run(String... args){
        if (companyRepository.findById(1).isPresent()){
            System.out.println("Company details created");
        } else {
            Company company = new Company();
            company.setId(1);
            company.setCompanyname("example (Pvt) Ltd");
            company.setContactnumber("12345678");
            company.setEmail("example@example.com");
            company.setCity("Colombo");
            company.setCountry("Sri Lanka");
            company.setAddressline1("Example address line 1");
            company.setAddressline2("Example address line 2");
            
            companyRepository.save(company);
            System.out.println("Company details created");
        }
    }
}
