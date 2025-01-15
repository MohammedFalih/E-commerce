package com.example.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.dto.ProductDTO;
import com.example.e_commerce.service.customer.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> getProductDtoList = customerService.getAllProducts();
        return ResponseEntity.ok(getProductDtoList);
    }

    @GetMapping("/product/search/{title}")
    public ResponseEntity<List<ProductDTO>> searchProduct(@PathVariable String title) {
        List<ProductDTO> getProductDtoList = customerService.searchProduct(title);
        return ResponseEntity.ok(getProductDtoList);
    }

}
