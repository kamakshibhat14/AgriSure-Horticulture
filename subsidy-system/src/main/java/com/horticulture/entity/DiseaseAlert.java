package com.horticulture.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "disease_alert")
public class DiseaseAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String crop;

    private double latitude;

    private double longitude;

    private String diseaseName;

    // ✅ Default constructor (REQUIRED)
    public DiseaseAlert() {
    }

    // ✅ Parameterized constructor (optional but useful)
    public DiseaseAlert(String crop, double latitude, double longitude, String diseaseName) {
        this.crop = crop;
        this.latitude = latitude;
        this.longitude = longitude;
        this.diseaseName = diseaseName;
    }

    // ✅ GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }
}