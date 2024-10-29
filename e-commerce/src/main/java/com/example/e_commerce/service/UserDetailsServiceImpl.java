package com.example.e_commerce.service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.e_commerce.entities.User;
import com.example.e_commerce.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findFirstByEmail(username);
        if (user == null)
            throw new UsernameNotFoundException("username not found", null);

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());

    }

}
