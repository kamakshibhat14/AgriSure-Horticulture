package com.horticulture.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.horticulture.entity.Scheme;
import java.util.List;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    List<Scheme> findByCropTypeIgnoreCase(String cropType);

}