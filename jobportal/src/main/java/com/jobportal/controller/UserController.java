package com.jobportal.controller;

import com.jobportal.entity.User;
import com.jobportal.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

 // REGISTER USER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        System.out.println("🔥 CONTROLLER HIT");

        return userService.registerUser(user);
    }

    // GET ALL USERS
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String softDelete(@PathVariable Long id) {

        userService.softDeleteUser(id);

        return "User Soft Deleted";
    }
    // CHANGE STATUS (ACTIVE/INACTIVE)
    @PutMapping("/{id}/status")
    public User changeStatus(@PathVariable Long id,
                             @RequestParam boolean isActive) {
        return userService.changeStatus(id, isActive);
    }
}