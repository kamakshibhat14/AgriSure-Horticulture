package com.horticulture.controller;

import com.horticulture.service.TransparencyService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transparency")
@CrossOrigin
public class TransparencyController {

    private final TransparencyService service;

    public TransparencyController(TransparencyService service) {
        this.service = service;
    }

    

    @GetMapping("/{mobile}")
    public Map<String, Object> getTransparency(@PathVariable String mobile) {

        return service.getTransparency(mobile);
    }
}