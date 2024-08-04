package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Payment;
import com.inventory_management.repository.CustomerRepository;
import com.inventory_management.repository.PaymentRepository;
import com.inventory_management.repository.SuplierRepository;
import org.springframework.data.domain.Sort;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository repo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private SuplierRepository suplierRepo;

    public Payment createPayment(Payment payment){
        int customerId = payment.getCustomer().getId();
        int suplierId = payment.getSuplier().getId();

        if (suplierId == 0){
            payment.setCustomer(customerRepo.findById(customerId).orElse(null));
            payment.setSuplier(null);
        }
        else{
            payment.setSuplier(suplierRepo.findById(suplierId).orElse(null));
            payment.setCustomer(null);
        }

        return repo.save(payment);
    }

    public List<Payment> getPayments(){
        return repo.findAll();
    } 

    public Payment getPayment(int id){
        return repo.findById(id).orElse(null);
    }

    public String removePayment(int id){
        repo.deleteById(id);        
        return "success";
    }

    public String cancelEntry (int id){
        Payment payment = repo.findById(id).orElse(null);
        
        payment.setStatus("canceled");
        repo.save(payment);

        return "success";
    }

    public List<Payment> getCustomerPayments (){
        List<Payment> payments = repo.findByPaymenttype("customer");

        return payments;
    }

    public List<Payment> getSuplierPayments (){
        List<Payment> payments = repo.findByPaymenttype("suplier");

        return payments;
    }

    public Payment updatePayment(int id, Payment payment){
        Payment existing = repo.findById(id).orElse(null);

        existing.setPayslipcode(payment.getPayslipcode());
        existing.setStatus(payment.getStatus());
        existing.setNote(payment.getNote());
        existing.setDate(payment.getDate());
        existing.setPaymentmethod(payment.getPaymentmethod());
        existing.setPaymenttype(payment.getPaymenttype());
        existing.setAccountnumber(payment.getAccountnumber());
        existing.setAccountholder(payment.getAccountholder());
        existing.setBank(payment.getBank());
        existing.setAmount(payment.getAmount());

        int customerId = payment.getCustomer().getId();
        int suplierId = payment.getSuplier().getId();

        if (suplierId == 0){
            existing.setCustomer(customerRepo.findById(customerId).orElse(null));
            existing.setSuplier(null);
        }
        else{
            existing.setSuplier(suplierRepo.findById(suplierId).orElse(null));
            existing.setCustomer(null);
        }
        
        return repo.save(existing);
    }

    public List<Payment> sortDesc(){
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}
