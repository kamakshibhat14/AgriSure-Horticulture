package com.horticulture.controller;

import com.horticulture.dto.NearbyShopResponse;
import com.horticulture.entity.PesticideData;
import com.horticulture.entity.PesticideShop;
import com.horticulture.repository.PesticideRepository;
import com.horticulture.repository.PesticideShopRepository;
import com.horticulture.util.DistanceUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pesticides")
@CrossOrigin(origins = "*")
public class PesticideController {

    @Autowired
    private PesticideRepository repository;

    @Autowired
    private PesticideShopRepository shopRepository;

    @GetMapping("/filter")
    public List<PesticideData> getPesticides(
            @RequestParam String crop,
            @RequestParam String type) {

        if (type.equalsIgnoreCase("BANNED")) {
            return repository.findByType("BANNED");
        }

        return repository.findByCropAndType(crop, type);
    }

    @GetMapping("/crops")
    public List<String> getAllCrops() {
        return repository.findDistinctCrops();
    }

    // ADD PESTICIDE
    @PostMapping("/add")
    public PesticideData addPesticide(@RequestBody PesticideData pesticide) {
        return repository.save(pesticide);
    }

    // GET ALL PESTICIDES
    @GetMapping("/all")
    public List<PesticideData> getAll() {
        return repository.findAll();
    }

    // DELETE PESTICIDE
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // GET NEARBY SHOPS BASED ON CURRENT LOCATION
    @GetMapping("/nearby-shops")
    public List<NearbyShopResponse> getNearbyShops(
            @RequestParam String crop,
            @RequestParam double lat,
            @RequestParam double lon) {

        List<PesticideShop> shops = shopRepository.findByCrop(crop);

        List<NearbyShopResponse> nearby = new ArrayList<>();

        for (PesticideShop s : shops) {

            double distance = DistanceUtil.calculate(
                    lat,
                    lon,
                    s.getLatitude(),
                    s.getLongitude()
            );

            if (distance < 20) {

                nearby.add(
                        new NearbyShopResponse(
                                s.getShopName(),
                                s.getAddress(),
                                s.getMobile(),
                                distance
                        )
                );
            }
        }
        nearby.sort(
            (a, b) -> Double.compare(
                a.getDistance(),
                b.getDistance()
            )
        );

        return nearby;
    }
}