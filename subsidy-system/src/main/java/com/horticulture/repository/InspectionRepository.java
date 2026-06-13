package com.horticulture.repository;

import com.horticulture.entity.Inspection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InspectionRepository extends JpaRepository<Inspection, Long> {
    boolean existsByFarmer_Id(Long farmerId);

    List<Inspection> findByFarmer_Mobile(String mobile);
}