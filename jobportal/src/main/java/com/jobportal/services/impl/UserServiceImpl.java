package com.jobportal.services.impl;

import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import com.jobportal.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // REGISTER USER
    @Override
    public User registerUser(User user) {

        user.setIsActive(true);

        return userRepository.save(user);
    }

    // GET ALL USERS
    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // GET USER BY ID
    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // UPDATE USER
    @Override
    public User updateUser(Long id, User user) {

        User existing = getUserById(id);

        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setPassword(user.getPassword());
        existing.setRole(user.getRole());

        return userRepository.save(existing);
    }

    // SOFT DELETE USER
    @Override
    public void softDeleteUser(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {

            user.setIsActive(false);

            userRepository.save(user);
        }
    }

    // CHANGE STATUS
    @Override
    public User changeStatus(Long id, boolean isActive) {

        User user = getUserById(id);

        user.setIsActive(isActive);

        return userRepository.save(user);
    }

    // LOGIN
    @Override
    public User login(String email, String password) {

        return userRepository
                .findByEmailAndPassword(email, password);
    }
}