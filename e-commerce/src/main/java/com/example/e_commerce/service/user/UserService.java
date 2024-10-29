package com.example.e_commerce.service.user;

import com.example.e_commerce.dto.SignupDTO;
import com.example.e_commerce.dto.UserDTO;

public interface UserService {

    UserDTO createdUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);

}
