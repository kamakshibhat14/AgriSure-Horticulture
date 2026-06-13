package com.horticulture.controller;

import com.horticulture.entity.Farmer;
import com.horticulture.entity.Subsidy;
import com.horticulture.repository.FarmerRepository;
import com.horticulture.repository.SubsidyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocation")
@CrossOrigin(origins = "http://localhost:3000")
public class SubsidyController {

    private final SubsidyRepository subsidyRepository;
    private final FarmerRepository farmerRepository;

    // Constructor Injection
    public SubsidyController(SubsidyRepository subsidyRepository,
                             FarmerRepository farmerRepository) {
        this.subsidyRepository = subsidyRepository;
        this.farmerRepository = farmerRepository;
    }

    // Add Subsidy
    @PostMapping("/{farmerId}")
    public Subsidy addSubsidy(@PathVariable Long farmerId,
                              @RequestBody Subsidy subsidy) {

        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        subsidy.setFarmer(farmer);

        return subsidyRepository.save(subsidy);
    }

    // Get All Subsidies
    @GetMapping
    public List<Subsidy> getAllSubsidies() {
        return subsidyRepository.findAll();
    }

    //  Get Subsidy By Farmer Id
    @GetMapping("/farmer/{farmerId}")
    public List<Subsidy> getByFarmer(@PathVariable Long farmerId) {
        return subsidyRepository.findByFarmerId(farmerId);
    }

    //  Update Subsidy
    @PutMapping("/{id}")
    public Subsidy updateSubsidy(@PathVariable Long id,
                                 @RequestBody Subsidy updatedSubsidy) {

        Subsidy subsidy = subsidyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subsidy not found"));

        subsidy.setSchemeName(updatedSubsidy.getSchemeName());
        subsidy.setAmount(updatedSubsidy.getAmount());
        subsidy.setSanctionedDate(updatedSubsidy.getSanctionedDate());
        subsidy.setStatus(updatedSubsidy.getStatus());

        return subsidyRepository.save(subsidy);
    }

    // Delete Subsidy
    @DeleteMapping("/{id}")
    public String deleteSubsidy(@PathVariable Long id) {

        subsidyRepository.deleteById(id);

        return "Subsidy Deleted Successfully";
    }
}