package com.example.e_commerce.dto;

import com.example.e_commerce.enums.UserRole;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

    public UserDTO(Long id, String email, String name, UserRole userRole) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.userRole = userRole;
    }

    private Long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;
}
