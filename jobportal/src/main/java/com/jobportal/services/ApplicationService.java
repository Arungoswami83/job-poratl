package com.jobportal.services;

import com.jobportal.entity.Application;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplicationService {

    Application applyJob(Long userId, Long jobId, MultipartFile resume);

    List<Application> getAllApplications();

    List<Application> getApplicationsByUser(Long userId);

    List<Application> getApplicationsByJob(Long jobId);

    Application updateStatus(Long applicationId, String status);
    
    Application getApplicationById(Long id);   

}