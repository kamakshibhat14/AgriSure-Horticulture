import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WeatherPage() {

  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // ✅ Auto get location

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);

        console.log("Location:", pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        alert("Location access denied");
      }
    );
}, []);
 

  // ✅ Fetch weather
  const fetchWeather = async () => {

  if (!mobile) {
    alert("Enter mobile number");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.get(
    `http://localhost:8082/api/weather/check?mobile=${mobile}&lat=${lat}&lon=${lon}`
    );

    console.log("API Response:", res.data);

    // ✅ If backend sends string (ALERT / ERROR)
    if (typeof res.data === "string") {

      // ❗ Disease alert
      if (res.data.includes("Alert") || res.data.includes("ALERT")) {
        alert(res.data);
        setWeather(null);
        setLoading(false);
        return;
      }


      // ❗ Farmer not found / other error
      if (res.data.includes("❌")) {
        alert(res.data);
        setWeather(null);
        setLoading(false);
        return;
      }

      // ❗ If string but JSON → parse safely
      try {
        const parsed = JSON.parse(res.data);
        setWeather(parsed);
      } catch {
        alert("Unexpected response from server");
      }

    } else {
      // ✅ Normal JSON
      setWeather(res.data);
    }

  } catch (error) {
    console.error("FULL ERROR:", error);
    alert("Backend error! Check console");
  }

  setLoading(false);
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6">

    <div className="max-w-5xl mx-auto">

      {/* ✅ BACK BUTTON RIGHT */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          ⬅ Back
        </button>
      </div>

      {/* ✅ TITLE */}
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        🌦 Weather + Disease Alert
      </h2>

      {/* ✅ INPUT + BUTTON IN ROW */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          placeholder="Enter Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
        />

        <button
          onClick={fetchWeather}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Loading..." : "Check"}
        </button>

      </div>

      {/* ✅ WEATHER RESULT */}
      {weather && weather.weather && weather.weather.main && (
        <div className="mt-4 bg-white p-4 shadow rounded-lg">

          <p>🌾 Crop: {weather.crop}</p>
          <p>🌡 Temp: {weather.weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.weather.main.humidity}%</p>

          <p className="mt-2 font-semibold">
            ⚠ Advice:
            {weather.disease
              ? " High disease risk ⚠"
              : weather.weather.main.temp > 35
              ? " High heat - Irrigation needed"
              : " Weather is safe"}
          </p>

        </div>
      )}

    </div>
  </div>
);
}

export default WeatherPage;