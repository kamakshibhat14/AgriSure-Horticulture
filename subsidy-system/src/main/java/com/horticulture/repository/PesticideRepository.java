package com.horticulture.repository;

import com.horticulture.entity.PesticideData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PesticideRepository extends JpaRepository<PesticideData, Long> {

    List<PesticideData> findByCropAndType(String crop, String type);

    List<PesticideData> findByType(String type);

    @Query("SELECT DISTINCT p.crop FROM PesticideData p ORDER BY p.crop ASC")
    List<String> findDistinctCrops();
}