package com.example.e_commerce.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.e_commerce.dto.SignupDTO;
import com.example.e_commerce.dto.UserDTO;
import com.example.e_commerce.entities.User;
import com.example.e_commerce.enums.UserRole;
import com.example.e_commerce.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDTO createdUser(SignupDTO signupDTO) {
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setUserRole(UserRole.USER);
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser = userRepo.save(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setName(createdUser.getName());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setUserRole(createdUser.getUserRole());
        return userDTO;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepo.findFirstByEmail(email) != null;
    }

}
