package com.horticulture.dto;

import com.horticulture.entity.Farmer;
import com.horticulture.entity.Subsidy;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private Farmer farmer;
    private List<Subsidy> subsidyHistory;
    private EligibilityResponse eligibility;
}
