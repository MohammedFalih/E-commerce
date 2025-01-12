package com.example.e_commerce.service.admin;

import java.io.IOException;
import java.util.List;

import com.example.e_commerce.dto.CategoryDTO;
import com.example.e_commerce.dto.ProductDTO;
import com.example.e_commerce.entities.Category;
import com.example.e_commerce.entities.Product;

public interface AdminService {

    Category createCategory(CategoryDTO category);

	List<CategoryDTO> getAllCategories();

    Product postProduct(Long categoryId, ProductDTO productDTO) throws IOException;

    List<ProductDTO> getAllProducts();

    void deleteProduct(Long id);
}
