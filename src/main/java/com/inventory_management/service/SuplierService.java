package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Suplier;
import com.inventory_management.repository.SuplierRepository;

@Service
public class SuplierService {
    
    @Autowired
    private SuplierRepository repo;

    public Suplier saveSuplier(Suplier suplier){
        return repo.save(suplier);
    }

    public List<Suplier> getSupliers(){
        return repo.findAll();
    }

    public Suplier getSuplier(int id){
        return repo.findById(id).orElse(null);
    }

    public String removeSuplier(int id){
        repo.deleteById(id);        
        return "success";
    }

    public Suplier updateSuplier(int id, Suplier suplier){
        Suplier existing = repo.findById(id).orElse(null);

        existing.setFirstname(suplier.getFirstname());
        existing.setLastname(suplier.getLastname());
        existing.setEmail(suplier.getEmail());
        existing.setContact(suplier.getContact());
        existing.setCompanyname(suplier.getCompanyname());
        existing.setAddressline1(suplier.getAddressline1());
        existing.setAddressline2(suplier.getAddressline2());
        existing.setCity(suplier.getCity());
        existing.setPostalcode(suplier.getPostalcode());

        return repo.save(existing);
    }


}
