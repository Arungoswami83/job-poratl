package com.jobportal.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("resume") MultipartFile file) {

        try {

            if (file.isEmpty()) {
                return "File is empty";
            }

            String originalName = file.getOriginalFilename();

            // unique file name (avoid overwrite)
            String fileName = UUID.randomUUID() + "_" + originalName;

            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            file.transferTo(new File(uploadDir + fileName));

            return "File uploaded successfully: " + fileName;

        } catch (Exception e) {
            return "Upload failed: " + e.getMessage();
        }
    }
}