package com.horticulture.controller;

import com.horticulture.entity.DiseaseAlert;
import com.horticulture.entity.Farmer;
import com.horticulture.repository.DiseaseAlertRepository;
import com.horticulture.repository.FarmerRepository;

import com.horticulture.service.WeatherService;
import com.horticulture.util.DistanceUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private DiseaseAlertRepository diseaseRepo;

    @Autowired
    private FarmerRepository farmerRepo;


    @GetMapping("/check")
    public String checkWeatherAndDisease(
            @RequestParam String mobile,
            @RequestParam double lat,
            @RequestParam double lon) {

        try {

            // Get farmer (ONLY for crop)
            Farmer farmer = farmerRepo.findByMobile(mobile)
                    .orElseThrow(() -> new RuntimeException("❌ Farmer not found"));

            String crop = farmer.getCropTypes();

            // USE LIVE LOCATION
            double userLat = lat;
            double userLon = lon;

            // Weather API
            String weatherData = weatherService.getWeather(userLat, userLon);

            // Disease check
            List<DiseaseAlert> alerts = diseaseRepo.findByCrop(crop);

            boolean diseaseFound = false;
            String diseaseName = "";

            // ==============================
            // FORCE WHEAT AS RISK
            // ==============================
            if (crop.equalsIgnoreCase("Wheat")) {

                diseaseFound = true;
                diseaseName = "High Risk (Wheat Sensitive Crop)";

                
            }

            // ==============================
            // EXISTING 5KM LOGIC (UNCHANGED)
            // ==============================
            for (DiseaseAlert d : alerts) {

                double distance = DistanceUtil.calculate(
                        userLat, userLon,
                        d.getLatitude(),
                        d.getLongitude()
                );

                if (distance < 5) {

                    diseaseFound = true;
                    diseaseName = d.getDiseaseName();


                    break;
                }
            }

            // FINAL RESPONSE
            return "{"
                    + "\"crop\":\"" + crop + "\","
                    + "\"weather\":" + weatherData + ","
                    + "\"disease\":" + diseaseFound + ","
                    + "\"diseaseName\":\"" + diseaseName + "\""
                    + "}";

        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Server error";
        }
    }
}