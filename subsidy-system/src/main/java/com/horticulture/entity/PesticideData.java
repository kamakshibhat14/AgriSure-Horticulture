package com.horticulture.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pesticide_data")
public class PesticideData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String crop;
    private String type;

    // 🔹 Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCrop() {
        return crop;
    }

    public String getType() {
        return type;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public void setType(String type) {
        this.type = type;
    }
}