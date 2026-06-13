package com.horticulture.service;

import com.horticulture.entity.Farmer;
import com.horticulture.entity.Inspection;
import com.horticulture.repository.FarmerRepository;
import com.horticulture.repository.InspectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class InspectionService {

    private final InspectionRepository inspectionRepository;
    private final FarmerRepository farmerRepository;

    public InspectionService(InspectionRepository inspectionRepository,
                             FarmerRepository farmerRepository) {
        this.inspectionRepository = inspectionRepository;
        this.farmerRepository = farmerRepository;
    }

    public String saveInspection(Long farmerId, double lat, double lon, MultipartFile image) throws Exception {

        // ✅ Get farmer (only for reference)
        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        // ❌ REMOVED: farmer location validation
        // ❌ REMOVED: distance calculation

        // ✅ AI Image Validation
        System.out.println("Calling AI validation...");
        boolean isValid = isValidCropImage(image);
        System.out.println("Image valid: " + isValid);

        if (!isValid) {
            return "❌ Invalid image. Please capture crop field image.";
        }

        // ✅ Prevent duplicate inspection
        boolean alreadyExists = inspectionRepository.existsByFarmer_Id(farmerId);

        if (alreadyExists) {
            return "❌ Inspection already uploaded for this farmer";
        }

        // ✅ Save inspection using OFFICER LOCATION
        Inspection inspection = new Inspection();
        inspection.setFarmer(farmer);
        inspection.setLatitude(lat);   // 📍 officer GPS
        inspection.setLongitude(lon);  // 📍 officer GPS
        inspection.setImage(image.getBytes());

        inspectionRepository.save(inspection);

        return "✅ Inspection uploaded successfully";
    }

   

    private boolean isValidCropImage(MultipartFile image) {
        try {
            String url = "http://127.0.0.1:5000/predict";

            org.springframework.web.client.RestTemplate restTemplate =
                    new org.springframework.web.client.RestTemplate();

            org.springframework.http.HttpHeaders headers =
                    new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.MULTIPART_FORM_DATA);

            org.springframework.util.MultiValueMap<String, Object> body =
                    new org.springframework.util.LinkedMultiValueMap<>();

            body.add("file", new org.springframework.core.io.ByteArrayResource(image.getBytes()) {
                @Override
                public String getFilename() {
                    return image.getOriginalFilename();
                }
            });

            org.springframework.http.HttpEntity<org.springframework.util.MultiValueMap<String, Object>> request =
                    new org.springframework.http.HttpEntity<>(body, headers);

            Object responseObj = restTemplate.postForObject(url, request, Object.class);

            Map<String, Object> response = (Map<String, Object>) responseObj;

            return (Boolean) response.get("valid");

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }
}