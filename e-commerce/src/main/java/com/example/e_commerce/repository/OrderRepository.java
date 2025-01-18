package com.example.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.e_commerce.entities.Order;
import com.example.e_commerce.enums.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);

}
