package com.horticulture.controller;

import com.horticulture.entity.Farmer;
import com.horticulture.entity.Subsidy;
import com.horticulture.repository.FarmerRepository;
import com.horticulture.repository.SubsidyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000")
public class SubsidyHistoryController {

    private final FarmerRepository farmerRepository;
    private final SubsidyRepository subsidyRepository;

    public SubsidyHistoryController(FarmerRepository farmerRepository,
                                    SubsidyRepository subsidyRepository) {
        this.farmerRepository = farmerRepository;
        this.subsidyRepository = subsidyRepository;
    }

    @GetMapping("/{mobile}")
    public List<Subsidy> getHistory(@PathVariable String mobile) {

        Farmer farmer = farmerRepository.findByMobile(mobile)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return subsidyRepository.findByFarmerId(farmer.getId());
    }
}