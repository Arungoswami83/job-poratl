package com.jobportal.controller;

import com.jobportal.entity.Application;
import com.jobportal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    // Apply Job
    @PostMapping("/apply")
    public Application applyJob(@RequestBody Application application) {

        application.setStatus("PENDING");

        return applicationRepository.save(application);
    }

    // Get All Applications
    @GetMapping
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }
    @PostMapping("/upload")
    public String uploadResume(
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        String path = "uploads/";

        file.transferTo(
                new File(path + file.getOriginalFilename())
        );

        return "Resume Uploaded Successfully";
    }
}	