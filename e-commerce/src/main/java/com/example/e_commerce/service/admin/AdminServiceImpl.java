package com.example.e_commerce.service.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.dto.CategoryDTO;
import com.example.e_commerce.entities.Category;
import com.example.e_commerce.repository.CategoryRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getCategoryDTO).collect(Collectors.toList());
    }
}
