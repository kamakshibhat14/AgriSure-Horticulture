package com.horticulture.service;

import com.horticulture.entity.Allocation;
import com.horticulture.entity.Farmer;
import com.horticulture.repository.AllocationRepository;
import com.horticulture.repository.FarmerRepository;
import com.horticulture.repository.GramaRepository;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransparencyService {

    private final FarmerRepository farmerRepo;
    private final AllocationRepository allocationRepo;
   

    public TransparencyService(
            FarmerRepository farmerRepo,
            AllocationRepository allocationRepo,
            GramaRepository gramaRepo) {

        this.farmerRepo = farmerRepo;
        this.allocationRepo = allocationRepo;
        
    }

    public Map<String, Object> getTransparency(String mobile) {

        Farmer farmer = farmerRepo.findByMobile(mobile)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        List<Allocation> allocations =
                allocationRepo.findByFarmerId(farmer.getId());

        double sanctioned = allocations.stream()
        .mapToDouble(Allocation::getAmount)
        .sum();

        double distributed = allocations.stream()
                .filter(a -> a.getStatus().equalsIgnoreCase("PAID"))
                .mapToDouble(Allocation::getAmount)
                .sum();

        double pending = allocations.stream()
                .filter(a -> a.getStatus().equalsIgnoreCase("PENDING"))
                .mapToDouble(Allocation::getAmount)
                .sum();

        

        Map<String, Object> result = new HashMap<>();

        result.put("farmerName",
                farmer.getFirstName() + " " + farmer.getLastName());

        result.put("allocations", allocations);
        result.put("totalSanctioned", sanctioned);
        result.put("totalDistributed", distributed);
        result.put("pendingAmount", pending);

        
        return result;
    }
}