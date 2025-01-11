package com.example.e_commerce.service.admin;

import java.util.List;

import com.example.e_commerce.dto.CategoryDTO;
import com.example.e_commerce.entities.Category;

public interface AdminService {

    Category createCategory(CategoryDTO category);

	List<CategoryDTO> getAllCategories();
}
