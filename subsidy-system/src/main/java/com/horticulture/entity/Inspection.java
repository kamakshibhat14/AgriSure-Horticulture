package com.horticulture.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double latitude;
    private double longitude;

    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"subsidies"}) // ✅ IMPORTANT FIX
    private Farmer farmer;

    
}