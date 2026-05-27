package com.jobportal.controller;

import com.jobportal.dto.LoginRequest;
import com.jobportal.entity.User;
import com.jobportal.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userService.registerUser(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req) {

        return userService.login(
                req.getEmail(),
                req.getPassword()
        );
    }
}