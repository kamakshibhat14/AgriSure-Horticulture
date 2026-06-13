package com.horticulture.repository;

import com.horticulture.entity.Subsidy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubsidyRepository extends JpaRepository<Subsidy, Long> {

    // Used in TransparencyService
    List<Subsidy> findByFarmerId(Long farmerId);

    // Used in EligibilityService (5-year rule)
    List<Subsidy> findByFarmerIdAndStatus(Long farmerId, String status);
}