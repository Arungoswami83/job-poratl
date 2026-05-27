package com.jobportal.controller;

import com.jobportal.entity.Application;
import com.jobportal.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // APPLY JOB
    @PostMapping("/apply")
    public Application applyJob(@RequestBody Map<String, Object> request) {

        Long userId = Long.valueOf(request.get("userId").toString());
        Long jobId = Long.valueOf(request.get("jobId").toString());
        String resume = request.get("resume").toString();

        return applicationService.applyJob(userId, jobId, resume);
    }

    // GET ALL APPLICATIONS
    @GetMapping("/all")
    public List<Application> getAll() {
        return applicationService.getAllApplications();
    }

    // GET BY USER
    @GetMapping("/user/{userId}")
    public List<Application> getByUser(@PathVariable Long userId) {
        return applicationService.getApplicationsByUser(userId);
    }

    // GET BY JOB
    @GetMapping("/job/{jobId}")
    public List<Application> getByJob(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJob(jobId);
    }

    // UPDATE STATUS (Admin)
    @PutMapping("/{id}/status")
    public Application updateStatus(@PathVariable Long id,
                                    @RequestParam String status) {
        return applicationService.updateStatus(id, status);
    }
}