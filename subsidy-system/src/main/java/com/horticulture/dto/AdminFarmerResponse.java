package com.horticulture.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AdminFarmerResponse {

    private Long id;
    private String fullName;
    private String mobile;
    private String aadhaar;
    private String village;
    private String cropType;

    private List<String> subsidyHistory;
    private boolean eligible;
}