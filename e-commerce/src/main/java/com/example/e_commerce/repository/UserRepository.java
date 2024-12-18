package com.example.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.e_commerce.entities.User;
import com.example.e_commerce.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String username);

    User findByUserRole(UserRole admin);

}
