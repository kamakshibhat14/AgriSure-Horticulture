package com.horticulture.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final String API_KEY = "07bfff577f4ad0e3c52d5e4f79894255";

    public String getWeather(double lat, double lon) {

        String url = "https://api.openweathermap.org/data/2.5/weather?lat="
                + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=metric";

        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.getForObject(url, String.class);

        

        return response;
    }
}