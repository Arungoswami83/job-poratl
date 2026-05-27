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

    @Override
    public User registerUser(User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(Long id, User user) {

        User existing = getUserById(id);

        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setPassword(user.getPassword());
        existing.setRole(user.getRole());

        return userRepository.save(existing);
    }
    
    @Override
    public void softDeleteUser(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {

            user.setActive(false);

            userRepository.save(user);
        }
    }

    @Override
    public User changeStatus(Long id, boolean isActive) {

        User user = getUserById(id);
        user.setActive(isActive);

        return userRepository.save(user);
    }
    @Override
    public User login(String email, String password) {

        return userRepository
                .findByEmailAndPassword(email, password);
    }
}