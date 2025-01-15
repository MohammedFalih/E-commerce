package com.example.e_commerce.service.customer;

import java.util.List;

import com.example.e_commerce.dto.ProductDTO;

public interface CustomerService {

    List<ProductDTO> getAllProducts();

    List<ProductDTO> searchProduct(String title);
}
