package com.jobportal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;

@RestController
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/dashboard")
    public Map<String, Long> dashboard() {

        Map<String, Long> data = new HashMap<>();

        data.put("users", userRepository.count());
        data.put("jobs", jobRepository.count());

        return data;
    }
}