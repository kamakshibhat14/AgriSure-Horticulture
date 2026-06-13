package com.horticulture.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Allocation {
     private LocalDate sanctionedDate;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;

    private String schemeName;

    private Double amount;

    private String status;

    private String remarks;

    

    public Allocation() {}

    public Long getId() { return id; }

    public Long getFarmerId() { return farmerId; }

    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public String getSchemeName() { return schemeName; }

    public void setSchemeName(String schemeName) { this.schemeName = schemeName; }

    public Double getAmount() { return amount; }

    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }

    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDate getSanctionedDate() {
        return sanctionedDate;
    }

    public void setSanctionedDate(LocalDate sanctionedDate) {
        this.sanctionedDate = sanctionedDate;
    }
}