package com.horticulture.controller;

import com.horticulture.entity.Inspection;
import com.horticulture.repository.InspectionRepository;
import com.horticulture.service.InspectionService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/inspection")
@CrossOrigin(origins = "http://localhost:3000")
public class InspectionController {

    private final InspectionService service;
    private final InspectionRepository inspectionRepository;

    
    public InspectionController(InspectionService service,
                                InspectionRepository inspectionRepository) {
        this.service = service;
        this.inspectionRepository = inspectionRepository;
    }

    @PostMapping("/upload")
    public String uploadInspection(
            @RequestParam Long farmerId,
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam MultipartFile image
    ) {
        try {
            return service.saveInspection(farmerId, lat, lon, image);
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error: " + e.getMessage();
        }
    }


    @GetMapping("/all")
    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }

    @GetMapping("/search")
    public List<Inspection> getByMobile(@RequestParam String mobile) {
        return inspectionRepository.findByFarmer_Mobile(mobile);
    }
}