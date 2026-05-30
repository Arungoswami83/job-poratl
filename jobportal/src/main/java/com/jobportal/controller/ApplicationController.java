package com.jobportal.controller;

import com.jobportal.entity.Application;
import com.jobportal.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping(value = "/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Application applyJob(
            @RequestParam("userId") Long userId,
            @RequestParam("jobId") Long jobId,
            @RequestParam("resume") MultipartFile resume
    ) {
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
    
    @GetMapping("/{id}/resume")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long id) {

        Application app = applicationService.getApplicationById(id);

        String filePath = System.getProperty("user.dir") + "/uploads/" + app.getResume();
        Path path = Paths.get(filePath);

        Resource resource = new FileSystemResource(path);

        if (!resource.exists()) {
            throw new RuntimeException("File not found");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + path.getFileName().toString() + "\"")
                .body(resource);
    }
}