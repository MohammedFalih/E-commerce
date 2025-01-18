package com.example.e_commerce.dto;

import lombok.Data;

@Data
public class CartItemDTO {

    private Long id;

    private Integer price;

    private Long quantity;

    private Long productId;

    private Long orderId;

    private Long userId;

    private String productName;

    private byte[] returnedImg;

}
