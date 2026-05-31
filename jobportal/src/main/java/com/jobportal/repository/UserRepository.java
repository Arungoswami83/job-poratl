package com.jobportal.repository;

import com.jobportal.entity.User;
import com.jobportal.enums.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	
    Optional<User> findByEmail(String email);
    
    User findByEmailAndPassword(String email,
            String password);
    
    long countByRole(Role role);


}