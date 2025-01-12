package com.example.e_commerce.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductDTO {

    private Long id;

    private String name;

    private String description;

    private Integer price;

    private MultipartFile image;

    private Long categoryId;

    private String categoryName;

    private byte[] returnedImage;

}
