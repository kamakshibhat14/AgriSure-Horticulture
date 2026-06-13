package com.horticulture.service;

import com.horticulture.dto.EligibilityResponse;
import com.horticulture.entity.Farmer;
import com.horticulture.entity.Subsidy;
import com.horticulture.repository.FarmerRepository;
import com.horticulture.repository.SubsidyRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

@Service
public class EligibilityService {

    private final FarmerRepository farmerRepository;
    private final SubsidyRepository subsidyRepository;

    public EligibilityService(FarmerRepository farmerRepository,
                              SubsidyRepository subsidyRepository) {
        this.farmerRepository = farmerRepository;
        this.subsidyRepository = subsidyRepository;
    }

    public EligibilityResponse checkEligibilityByMobile(String mobile) {

    Farmer farmer = farmerRepository.findByMobile(mobile)
            .orElseThrow(() -> new RuntimeException("Farmer not found"));

    List<Subsidy> allSubsidies =
            subsidyRepository.findByFarmerId(farmer.getId());

    if (allSubsidies.isEmpty()) {
        return new EligibilityResponse(
                farmer.getFirstName() + " " + farmer.getLastName(),
                null,
                null,
                null,
                null,
                null,
                true,
                "ELIGIBLE - No subsidy history found"
        );
    }

    // Latest subsidy (any status)
    Subsidy latest = allSubsidies.stream()
            .max(Comparator.comparing(Subsidy::getSanctionedDate))
            .get();

    // Calculate years difference
    long years = ChronoUnit.YEARS.between(
            latest.getSanctionedDate(),
            LocalDate.now()
    );

    // Only approved subsidies block eligibility
    List<Subsidy> approvedSubsidies =
            subsidyRepository.findByFarmerIdAndStatus(
                    farmer.getId(), "Approved"
            );

    if (approvedSubsidies.isEmpty()) {
        return new EligibilityResponse(
                farmer.getFirstName() + " " + farmer.getLastName(),
                latest.getSchemeName(),
                latest.getAmount(),
                latest.getStatus(),
                latest.getSanctionedDate().toString(),
                years,
                true,
                "ELIGIBLE - No approved subsidy found"
        );
    }

    Subsidy latestApproved = approvedSubsidies.stream()
            .max(Comparator.comparing(Subsidy::getSanctionedDate))
            .get();

    long approvedYears = ChronoUnit.YEARS.between(
            latestApproved.getSanctionedDate(),
            LocalDate.now()
    );

    if (approvedYears < 5) {

        int eligibleYear =
                latestApproved.getSanctionedDate()
                        .plusYears(5)
                        .getYear();

        return new EligibilityResponse(
                farmer.getFirstName() + " " + farmer.getLastName(),
                latestApproved.getSchemeName(),
                latestApproved.getAmount(),
                latestApproved.getStatus(),
                latestApproved.getSanctionedDate().toString(),
                approvedYears,
                false,
                "NOT ELIGIBLE until year " + eligibleYear
        );
    }

    return new EligibilityResponse(
            farmer.getFirstName() + " " + farmer.getLastName(),
            latestApproved.getSchemeName(),
            latestApproved.getAmount(),
            latestApproved.getStatus(),
            latestApproved.getSanctionedDate().toString(),
            approvedYears,
            true,
            "ELIGIBLE"
    );
}
}