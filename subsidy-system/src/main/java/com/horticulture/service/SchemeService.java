package com.horticulture.service;

import com.horticulture.entity.Scheme;
import com.horticulture.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    @Autowired
    private SchemeRepository repo;

    public Scheme saveScheme(Scheme scheme) {
        return repo.save(scheme);
    }

    public List<Scheme> getSchemesByCrop(String crop) {
        return repo.findByCropTypeIgnoreCase(crop);
    }

    public List<Scheme> getAllSchemes() {
        return repo.findAll();
    }

    public void deleteScheme(Long id) {
        repo.deleteById(id);
    }

    public Scheme updateScheme(Long id, Scheme scheme) {
        scheme.setId(id);   // ✅ NOW WORKS
        return repo.save(scheme);
    }
}