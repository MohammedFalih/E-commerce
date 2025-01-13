package com.example.e_commerce.service.admin;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.dto.CategoryDTO;
import com.example.e_commerce.dto.ProductDTO;
import com.example.e_commerce.entities.Category;
import com.example.e_commerce.entities.Product;
import com.example.e_commerce.repository.CategoryRepository;
import com.example.e_commerce.repository.ProductRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

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

    @Override
    public Product postProduct(Long categoryId, ProductDTO productDTO) throws IOException {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setImage(productDTO.getImage().getBytes());
            product.setCategory(optionalCategory.get());
            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new IllegalArgumentException("Product with id " + id + "not found");
        }
        productRepository.deleteById(id);
    }

    @Override
    public ProductDTO updateProduct(Long categoryId, Long productId, ProductDTO productDTO) throws IOException {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Optional<Product> optionalProduct =  productRepository.findById(productId);
        if (optionalCategory.isPresent() && optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setCategory(optionalCategory.get());
            if (productDTO.getImage() != null) {
                product.setImage(productDTO.getImage().getBytes());
            }
            Product updatedProduct = productRepository.save(product);
            ProductDTO updatedProductDTO = new ProductDTO();
            updatedProductDTO.setId(updatedProduct.getId());
            return updatedProductDTO;
        }
        return null;
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return product.getProductDTO();
        } 
        return null;
    }

    
}
