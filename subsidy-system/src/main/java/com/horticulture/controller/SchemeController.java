package com.horticulture.controller;

import com.horticulture.entity.Scheme;
import com.horticulture.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "*")
public class SchemeController {

    @Autowired
    private SchemeRepository repo;

    // GET ALL SCHEMES 
    @GetMapping("/all")
    public List<Scheme> getAllSchemes() {
        return repo.findAll();
    }

    // GET BY CROP
    @GetMapping("/{crop}")
    public List<Scheme> getByCrop(@PathVariable String crop) {
        return repo.findByCropTypeIgnoreCase(crop);
    }

    // ADD SCHEME
    @PostMapping("/add")
    public Scheme addScheme(@RequestBody Scheme scheme) {
        return repo.save(scheme);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Scheme updateScheme(@PathVariable Long id, @RequestBody Scheme scheme) {
        scheme.setId(id);
        return repo.save(scheme);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteScheme(@PathVariable Long id) {
        repo.deleteById(id);
    }
}