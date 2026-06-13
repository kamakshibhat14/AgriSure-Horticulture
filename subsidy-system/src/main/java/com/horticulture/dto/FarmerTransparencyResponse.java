package com.horticulture.dto;

public class FarmerTransparencyResponse {

    private String village;
    private double totalSanctioned;
    private double distributed;
    private double remaining;

    public FarmerTransparencyResponse(String village,
                                       double totalSanctioned,
                                       double distributed,
                                       double remaining) {
        this.village = village;
        this.totalSanctioned = totalSanctioned;
        this.distributed = distributed;
        this.remaining = remaining;
    }

    public String getVillage() {
        return village;
    }

    public double getTotalSanctioned() {
        return totalSanctioned;
    }

    public double getDistributed() {
        return distributed;
    }

    public double getRemaining() {
        return remaining;
    }
}