package com.horticulture.repository;

import com.horticulture.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AllocationRepository extends JpaRepository<Allocation, Long> {

    List<Allocation> findByFarmerId(Long farmerId);

}