package com.jobportal.controller;

import java.io.File;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("resume") MultipartFile file) {

        try {
            String fileName = file.getOriginalFilename();

            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            file.transferTo(new File(uploadDir + fileName));

            return "File uploaded: " + fileName;

        } catch (Exception e) {
            e.printStackTrace();
            return "Upload failed: " + e.getMessage();
        }
    }
}