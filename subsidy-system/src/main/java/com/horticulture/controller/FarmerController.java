package com.horticulture.controller;

import com.horticulture.entity.Farmer;
import com.horticulture.repository.FarmerRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/farmers")
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    // ADD FARMER
    @PostMapping
    public ResponseEntity<?> addFarmer(@Valid @RequestBody Farmer farmer) {
        return ResponseEntity.ok(farmerRepository.save(farmer));
    }

    // GET ALL FARMERS
    @GetMapping
    public ResponseEntity<?> getAllFarmers() {
        return ResponseEntity.ok(farmerRepository.findAll());
    }

    // UPDATE FARMER
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFarmer(@PathVariable Long id,
                                          @RequestBody Farmer updatedFarmer) {

        Optional<Farmer> optional = farmerRepository.findById(id);

        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body("Farmer not found");
        }

        Farmer farmer = optional.get();

        farmer.setFirstName(updatedFarmer.getFirstName());
        farmer.setMiddleName(updatedFarmer.getMiddleName());
        farmer.setLastName(updatedFarmer.getLastName());
        farmer.setMobile(updatedFarmer.getMobile());
        farmer.setAadhaar(updatedFarmer.getAadhaar());
        farmer.setVillage(updatedFarmer.getVillage());
        farmer.setCropTypes(updatedFarmer.getCropTypes());

        farmerRepository.save(farmer);

        return ResponseEntity.ok(farmer);
    }

    // DELETE FARMER
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFarmer(@PathVariable Long id) {

        if (!farmerRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Farmer not found");
        }

        farmerRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    // SEARCH BY NAME OR MOBILE
    @GetMapping("/search")
    public List<Farmer> searchFarmers(@RequestParam String query) {

        if (query.matches("\\d+")) {
            return farmerRepository.findByMobileContaining(query);
        }

        return farmerRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query);
    }

    @GetMapping("/by-mobile/{mobile}")
public ResponseEntity<?> getFarmerByMobile(@PathVariable String mobile) {

    try {
        System.out.println("Searching mobile: [" + mobile + "]");

        Farmer farmer = farmerRepository.findByMobile(mobile.trim()).orElse(null);

        if (farmer == null) {
            return ResponseEntity.status(404).body("Farmer not found");
        }

        return ResponseEntity.ok(farmer);

    } catch (Exception e) {
        e.printStackTrace();   // 🔥 IMPORTANT
        return ResponseEntity.status(500).body("ERROR: " + e.getMessage());
    }
}
}