package com.example.e_commerce.service.customer;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.e_commerce.dto.CartItemDTO;
import com.example.e_commerce.dto.OrderDTO;
import com.example.e_commerce.dto.ProductDTO;

public interface CustomerService {

    List<ProductDTO> getAllProducts();

    List<ProductDTO> searchProduct(String title);

    ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO);

    OrderDTO getCartByUserId(Long userId);
}
