package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobService.saveJob(job);
    }


    // GET ALL JOBS
    @GetMapping
    public List<Job> getAllJobs() {

        return jobService.getAllJobs();
    }

    // GET JOB BY ID
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // UPDATE JOB
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    // DELETE JOB
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return "Job deleted successfully";
    }
}