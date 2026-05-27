package com.jobportal.services;

import com.jobportal.entity.User;

import java.util.List;

public interface UserService {

    User registerUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);

    void softDeleteUser(Long id);
    
    User login(String email, String password);

    
    User changeStatus(Long id, boolean isActive);
}