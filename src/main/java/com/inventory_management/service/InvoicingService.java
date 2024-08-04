package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Customer;
import com.inventory_management.entity.Invoicing;
import com.inventory_management.repository.CustomerRepository;
import com.inventory_management.repository.InvoicingRepository;


@Service
public class InvoicingService {

    @Autowired
    private InvoicingRepository repo;

    @Autowired
    private CustomerRepository customerRepo;


    public List<Invoicing> getInvoicings(){
        return repo.findAll();
    }

    public Invoicing getInvoice(int id){
        return repo.findById(id).orElse(null);
    }

    public Invoicing saveInvoice(Invoicing invoice){
        int customerid = invoice.getCustomer().getId();

        Customer customer = customerRepo.findById(customerid).orElse(null);
        invoice.setCustomer(customer);

        return repo.save(invoice);
    }

    public String removeInvoice(int id){
        repo.deleteById(id);        
        return "success";
    }

    public String cancelEntry (int id){
        Invoicing invoicing = repo.findById(id).orElse(null);
        
        invoicing.setStatus("canceled");
        repo.save(invoicing);

        return "success";
    }

    public Invoicing updateInvoice (int id, Invoicing invoice){
        Invoicing existing = repo.findById(id).orElse(null);

        existing.setInvoicenumber(invoice.getInvoicenumber());
        existing.setNote(invoice.getNote());
        existing.setDate(invoice.getDate());
        existing.setAmount(invoice.getAmount());
        existing.setStatus(invoice.getStatus());
        existing.setCustomer(customerRepo.findById(invoice.getCustomer().getId()).orElse(null));

        return repo.save(existing);
    }

    public List<Invoicing> sortDesc(){
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}
