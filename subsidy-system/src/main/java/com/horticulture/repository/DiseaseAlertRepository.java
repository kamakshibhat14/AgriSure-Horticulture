package com.horticulture.repository;

import com.horticulture.entity.DiseaseAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiseaseAlertRepository extends JpaRepository<DiseaseAlert, Long> {

    List<DiseaseAlert> findByCrop(String crop);
}