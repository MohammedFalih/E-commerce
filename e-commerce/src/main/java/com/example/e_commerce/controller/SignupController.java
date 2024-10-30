package com.example.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.dto.SignupDTO;
import com.example.e_commerce.dto.UserDTO;
import com.example.e_commerce.service.user.UserService;

@RestController
public class SignupController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO) {

        if (userService.hasUserWithEmail(signupDTO.getEmail())) {
            return new ResponseEntity<>("User already Exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDTO createdUser = userService.createdUser(signupDTO);
        if (createdUser == null)
            return new ResponseEntity<>("Oops! User not created, Try Again", HttpStatus.BAD_GATEWAY);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

}
