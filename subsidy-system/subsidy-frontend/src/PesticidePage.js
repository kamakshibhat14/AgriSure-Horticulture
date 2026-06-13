import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PesticidePage() {

  const [crop, setCrop] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [crops, setCrops] = useState([]); // ✅ NEW

  const [shops, setShops] = useState([]);
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);

  const navigate = useNavigate();
  // ✅ FETCH CROPS FROM DB
  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/pesticides/crops");
      setCrops(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNearbyShops = async (lat, lon) => {

  try {

    const query = `
      [out:json][timeout:25];
      (
        node["shop"](around:80000,${lat},${lon});
        way["shop"](around:80000,${lat},${lon});
        relation["shop"](around:80000,${lat},${lon});
      );
      out center tags;
      `;

    const response = await axios.post(
      
      
      "https://overpass-api.de/api/interpreter",
      query,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    );
    
    console.log(response.data);
    const filtered = response.data.elements.filter((s) => {

      const name = s.tags?.name?.toLowerCase() || "";
      const shop = s.tags?.shop?.toLowerCase() || "";

      return (
        name.includes("pesticide") ||
        name.includes("fertilizer") ||
        name.includes("agro") ||
        name.includes("agri") ||
        name.includes("seed") ||
        name.includes("crop") ||
        name.includes("farm") ||
        name.includes("insecticide") ||
        name.includes("fungicide") ||
        name.includes("herbicide") ||
        name.includes("agencies") ||
        name.includes("agrovet") ||
        name.includes("plant") ||
        shop.includes("agrarian") ||
        shop.includes("garden_centre")
      );

    });

    const sortedShops = filtered.sort((a, b) => {

    const distA = calculateDistance(
      lat,
      lon,
      a.lat || a.center?.lat,
      a.lon || a.center?.lon
    );

    const distB = calculateDistance(
      lat,
      lon,
      b.lat || b.center?.lat,
      b.lon || b.center?.lon
    );

    return distA - distB;

  });

  setShops(sortedShops);

  } catch (error) {

    console.error(error);

    setShops([]);

  }
};

  const fetchData = async () => {
    try {
      let url = "";

      if (type === "BANNED") {
        url = `http://localhost:8082/api/pesticides/filter?crop=All&type=BANNED`;
      } else {
        url = `http://localhost:8082/api/pesticides/filter?crop=${crop}&type=${type}`;
      }

      const res = await axios.get(url);
      setData(res.data);

      navigator.geolocation.getCurrentPosition(

        async (pos) => {

          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          setUserLat(lat);
          setUserLon(lon);
          fetchNearbyShops(lat, lon);

        },

        () => {
          alert("Location permission denied");
        }

      );

  
    } catch (error) {
      console.error(error);
    }
  };
  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">

      {/* CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">

      <div className="mb-4 flex justify-end">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        ⬅ Back
      </button>
    </div>
              <h2 className="text-2xl font-bold text-green-700 mb-6">
          🧪 Pesticide Information
        </h2>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {/* TYPE */}
          <select
            onChange={(e) => setType(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-1/3"
          >
            <option value="">Select Type</option>
            <option value="APPROVED">Approved</option>
            <option value="BANNED">Banned</option>
          </select>

          {/* ✅ UPDATED CROP DROPDOWN */}
          {type !== "BANNED" && (
            <select
              onChange={(e) => setCrop(e.target.value)}
              className="border p-3 rounded-lg w-full md:w-1/3"
            >
              <option value="">Select Crop</option>

              {crops.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}

            </select>
          )}

          {/* BUTTON */}
          <button
            onClick={fetchData}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            Get Pesticides
          </button>

        </div>

        {/* TABLE */}
        {data.length > 0 && (
          <div className="overflow-x-auto">

            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Crop</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-green-50 transition"
                  >
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.crop}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          p.type === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
            
            {/* ✅ NEARBY SHOPS TABLE */}

{shops.length > 0 ? (

  <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">

    <div className="bg-green-600 text-white px-6 py-4">
      <h2 className="text-2xl font-bold">
        📍 Nearby Agro / Pesticide Shops
      </h2>
    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-green-100">

          <tr>

            <th className="px-6 py-4 text-left text-green-800 font-bold">
              Shop Name
            </th>

            <th className="px-6 py-4 text-left text-green-800 font-bold">
              Distance
            </th>

            <th className="px-6 py-4 text-center text-green-800 font-bold">
              Map
            </th>

          </tr>

        </thead>

        <tbody>

          {shops.map((shop, index) => (

            <tr
              key={index}
              className="border-b hover:bg-green-50 transition"
            >

              <td className="px-6 py-4 font-semibold text-gray-800">
                {shop.tags?.name || "Unnamed Shop"}
              </td>

              <td className="px-6 py-4 font-semibold text-green-700">

                {calculateDistance(
                  userLat,
                  userLon,
                  shop.lat || shop.center?.lat,
                  shop.lon || shop.center?.lon
                ).toFixed(2)} KM

              </td>

             
              <td className="px-6 py-4 text-center">

                <a
                  href={`https://www.google.com/maps?q=${
                    shop.lat || shop.center?.lat
                  },${
                    shop.lon || shop.center?.lon
                  }`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-block"
                >
                  Open Map
                </a>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

) : (

  data.length > 0 && (

    <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">

      No nearby pesticide shops found for your location.

    </div>

  )

)}
            

          </div>
        )}

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <p className="text-gray-500 mt-4">
            No data found. Please select filters and click "Get Pesticides".
          </p>
        )}

      </div>

    </div>
  );
}

export default PesticidePage;