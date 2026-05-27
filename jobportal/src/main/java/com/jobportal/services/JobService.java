package com.jobportal.services;

import com.jobportal.entity.Job;

import java.util.List;

public interface JobService {

    Job saveJob(Job job);

    List<Job> getAllJobs();

    Job getJobById(Long id);

    Job updateJob(Long id, Job job);

    void deleteJob(Long id);
}