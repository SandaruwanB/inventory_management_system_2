package com.inventory_management.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.GRN;
import com.inventory_management.entity.Inventory;
import com.inventory_management.entity.StockMove;
import com.inventory_management.repository.GRNRepository;
import com.inventory_management.repository.InventoryRepository;

@Service
public class GrnService {
    
    @Autowired
    private GRNRepository repo;

    @Autowired
    private InventoryRepository inventoryRepo;

    public GRN addGrn(GRN grn){

        List<StockMove> inventories = grn.getMovements();

        for (StockMove stockMove : inventories){

            Inventory product = inventoryRepo.findById(stockMove.getProduct().getId()).orElse(null);
            product.setInqty(stockMove.getProduct().getInqty());
            product.setOnhandqty(stockMove.getProduct().getOnhandqty());

            inventoryRepo.save(product);
        }  

        return repo.save(grn);
    }

    public List<GRN> getGrns(){
        return repo.findAll();
    }

    public GRN getGrn(int id){
        return repo.findById(id).orElse(null);
    }

    public String removeGrn(int id){
        
        GRN grn = repo.findById(id).orElse(null);
        List<StockMove> stockMoves = grn.getMovements();
        for (StockMove move: stockMoves ){
            Inventory product = inventoryRepo.findById(move.getProduct().getId()).orElse(null);

            float onhandqtyfloat = product.getOnhandqty() - move.getQuantity();
            long onhandqty = (long) onhandqtyfloat;

            float inqtyfloat = product.getInqty() - move.getQuantity();
            long inqty = (long) inqtyfloat;

            product.setOnhandqty(onhandqty);
            product.setInqty(inqty);

            inventoryRepo.save(product);
        }

        repo.deleteById(id);

        return "success";
    }

    public String updateGrn(int id, GRN grn){

        GRN existing = repo.findById(id).orElse(null);

        existing.setGrncode(grn.getGrncode());
        existing.setDate(grn.getDate());
        existing.setMovements(grn.getMovements());
        existing.setSuplier(grn.getSuplier());
        existing.setNote(grn.getNote());

        repo.save(existing);

        return "success";
    }
}
