package com.inventory_management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory_management.entity.Inventory;
import com.inventory_management.entity.Order;
import com.inventory_management.entity.OrderMove;
import com.inventory_management.repository.InventoryRepository;
import com.inventory_management.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository repo;

    @Autowired
    private InventoryRepository inventoryRepo;

    public Order saveOrder(Order order){
        List<OrderMove> orderMoves = order.getOrdermove();

        for (OrderMove move : orderMoves){
            Inventory product = inventoryRepo.findById(move.getProduct().getId()).orElse(null);

            double onhand = product.getOnhandqty() - move.getItemcount();
            int onhandqty = (int) onhand;

            double outqtydouble = product.getOutqty() + move.getItemcount();
            int outqty = (int) outqtydouble;

            product.setOnhandqty(onhandqty);
            product.setOutqty(outqty);
        }

        return repo.save(order);
    }

    public List<Order> getOrders(){
        return repo.findAll();
    }

    public Order getOrder(int id){
        return repo.findById(id).orElse(null);
    }

    public String deleteOrder(int id){
        Order order = repo.findById(id).orElse(null);
        List<OrderMove> orderMoves = order.getOrdermove();

        for (OrderMove move : orderMoves){
            Inventory product = inventoryRepo.findById(move.getProduct().getId()).orElse(null);

            double onhandqtyfloat = product.getOnhandqty() + move.getItemcount();
            int onhandqty = (int) onhandqtyfloat; 

            double outqtyfloat = product.getOutqty() - move.getItemcount();
            int outqty = (int) outqtyfloat;

            product.setOnhandqty(onhandqty);
            product.setOutqty(outqty);

            inventoryRepo.save(product);
        }

        repo.deleteById(id);
        return "success";
    }

    public List<Order> getCustomerOrders () {
        List<Order> orders = repo.findByType("customer");
        return orders;
    }

    public List<Order> getSuplierOrders (){
        List<Order> orders = repo.findByType("suplier");
    
        return orders;
    }

}
