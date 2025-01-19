package com.example.e_commerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.e_commerce.entities.CartItems;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Long>{

    Optional<CartItems> findByUserIdAndProductIdAndOrderId(Long userId, Long productId, Long orderId);

}