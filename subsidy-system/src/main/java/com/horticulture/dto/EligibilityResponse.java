package com.horticulture.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EligibilityResponse {

    private String farmerName;

    private String schemeName;
    private Double amount;
    private String status;

    private String lastSubsidyDate;
    private Long yearsSinceLastSubsidy;

    private Boolean eligible;
    private String message;
}