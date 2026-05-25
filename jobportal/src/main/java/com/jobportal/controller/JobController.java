package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    // Add Job
    @PostMapping("/add")
    public Job addJob(@RequestBody Job job) {

        return jobRepository.save(job);
    }

    // Get All Jobs
    @GetMapping
    public List<Job> getAllJobs() {

        return jobRepository.findAll();
    }
    @PutMapping("/jobs/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {

        Job existing = jobRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setTitle(job.getTitle());
            existing.setCompany(job.getCompany());
            existing.setLocation(job.getLocation());
            existing.setSalary(job.getSalary());
            existing.setDescription(job.getDescription());

            return jobRepository.save(existing);
        }

        return null;
    }
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok("Job deleted successfully");
    }
}