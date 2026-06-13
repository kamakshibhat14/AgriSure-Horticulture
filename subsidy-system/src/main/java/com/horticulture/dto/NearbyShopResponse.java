package com.horticulture.dto;

public class NearbyShopResponse {

    private String shopName;
    private String address;
    private String mobile;
    private double distance;

    public NearbyShopResponse(
            String shopName,
            String address,
            String mobile,
            double distance) {

        this.shopName = shopName;
        this.address = address;
        this.mobile = mobile;
        this.distance = distance;
    }

    public String getShopName() {
        return shopName;
    }

    public String getAddress() {
        return address;
    }

    public String getMobile() {
        return mobile;
    }

    public double getDistance() {
        return distance;
    }
}