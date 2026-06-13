package com.horticulture.repository;

import com.horticulture.entity.PesticideShop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PesticideShopRepository
        extends JpaRepository<PesticideShop, Long> {

    List<PesticideShop> findByCrop(String crop);
}