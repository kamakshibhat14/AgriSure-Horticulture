package com.horticulture.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subsidy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String schemeName;
    private Double amount;
    private LocalDate sanctionedDate;
    private String status;
    private String remarks;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Farmer farmer;
}