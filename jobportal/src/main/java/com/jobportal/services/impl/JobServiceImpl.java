package com.jobportal.services.impl;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import com.jobportal.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    // CREATE JOB
    @Override
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    // GET ALL JOBS
    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // GET JOB BY ID
    @Override
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    // UPDATE JOB
    @Override
    public Job updateJob(Long id, Job job) {

        Job existing = getJobById(id);

        existing.setTitle(job.getTitle());
        existing.setCompany(job.getCompany());
        existing.setLocation(job.getLocation());
        existing.setSalary(job.getSalary());
        existing.setDescription(job.getDescription());

        return jobRepository.save(existing);
    }

    // DELETE JOB
    @Override
    public void deleteJob(Long id) {

        jobRepository.deleteById(id);
    }
}