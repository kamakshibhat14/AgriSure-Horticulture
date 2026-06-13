package com.horticulture.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.horticulture.entity.Officer;

public interface OfficerRepository extends JpaRepository<Officer,Long> {

Officer findByEmail(String email);

}