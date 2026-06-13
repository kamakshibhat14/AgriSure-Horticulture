package com.horticulture.repository;

import com.horticulture.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {

    // Required for EligibilityService
    Optional<Farmer> findByMobile(String mobile);

    // Required for Search
    List<Farmer> findByMobileContaining(String mobile);

    List<Farmer> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName,
            String lastName
    );
}