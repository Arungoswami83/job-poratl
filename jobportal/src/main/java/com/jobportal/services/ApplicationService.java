package com.jobportal.services;

import com.jobportal.entity.Application;
import java.util.List;

public interface ApplicationService {

    Application applyJob(Long userId, Long jobId, String resume);

    List<Application> getAllApplications();

    List<Application> getApplicationsByUser(Long userId);

    List<Application> getApplicationsByJob(Long jobId);

    Application updateStatus(Long applicationId, String status);
}