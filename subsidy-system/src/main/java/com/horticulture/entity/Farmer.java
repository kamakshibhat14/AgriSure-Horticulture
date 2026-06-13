package com.horticulture.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity

public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Middle Name is required")
    private String middleName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    @Column(unique = true)
    private String mobile;

    @NotBlank(message = "Aadhaar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhaar must be 12 digits")
    @Column(unique = true)
    private String aadhaar;

    @NotBlank(message = "Village is required")
    private String village;

    @NotBlank(message = "Crop Types are required")
    private String cropTypes;

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Subsidy> subsidies;
   

    private Double latitude;
    private Double longitude;

    // GETTERS AND SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getAadhaar() { return aadhaar; }
    public void setAadhaar(String aadhaar) { this.aadhaar = aadhaar; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getCropTypes() {
            return cropTypes;
        }

        public void setCropTypes(String cropTypes) {
            this.cropTypes = cropTypes;
        }
    public java.util.List<Subsidy> getSubsidies() {
        return subsidies;
    }

    public void setSubsidies(java.util.List<Subsidy> subsidies) {
        this.subsidies = subsidies;
    }

    

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    
}
