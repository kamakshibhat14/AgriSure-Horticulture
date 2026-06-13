package com.horticulture.controller;

import com.horticulture.dto.EligibilityResponse;
import com.horticulture.service.EligibilityService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/eligibility")
@CrossOrigin(origins = "http://localhost:3000")
public class EligibilityController {

    private final EligibilityService eligibilityService;

    public EligibilityController(EligibilityService eligibilityService) {
        this.eligibilityService = eligibilityService;
    }

    @GetMapping("/{mobile}")
    public EligibilityResponse checkEligibility(@PathVariable String mobile) {
        return eligibilityService.checkEligibilityByMobile(mobile);
    }
}