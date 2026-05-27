package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    private String resume;

    private String status = "PENDING";

    public Application(Long id, User user, Job job, String resume, String status) {
        this.id = id;
        this.user = user;
        this.job = job;
        this.resume = resume;
        this.status = (status != null) ? status : "PENDING";
    }
}