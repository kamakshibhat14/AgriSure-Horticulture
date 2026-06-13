import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InspectionPage() {

  const videoRef = useRef(null);

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [farmer, setFarmer] = useState(null);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);
  // ✅ FETCH FARMER
  const fetchFarmer = async () => {
    if (!mobile) {
      alert("Enter mobile number");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8082/farmers/by-mobile/${mobile.trim()}`);

      if (!res.ok) {
        const text = await res.text();
        alert(text);
        return;
      }

      const data = await res.json();
      setFarmer(data);

    } catch (err) {
      alert("Server error");
    }
  };

  // ✅ START CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch {
      alert("Camera permission denied");
    }
  };

  const getLocation = () => {
  if (!navigator.geolocation) {
    alert("❌ Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    },
    (error) => {
      alert("❌ Please enable location to continue");
    }
  );
};

  // ✅ CAPTURE PHOTO
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
        setImage(blob);
        setPreview(URL.createObjectURL(blob));
        setCameraOn(false);

        // 🔥 AUTO FETCH GPS WHEN PHOTO CAPTURED
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            setLat(pos.coords.latitude);
            setLon(pos.coords.longitude);
        },
        () => alert("Enable GPS for accurate location")
        );

    }, "image/jpeg");
    };

  // ✅ RETAKE PHOTO
  const retakePhoto = () => {
    setImage(null);
    setPreview(null);
    startCamera();
    getLocation();
  };



  // ✅ UPLOAD INSPECTION
  const uploadInspection = async () => {

    if (!lat || !lon) {
      alert("❌ Location is required. Please enable GPS.");
      return;
    }

    if (!farmer) {
      alert("Fetch farmer first");
      return;
    }

    if (!image) {
      alert("Capture image");
      return;
    }

    

    const formData = new FormData();
    formData.append("farmerId", farmer.id);
    formData.append("lat", lat);
    formData.append("lon", lon);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:8082/inspection/upload", {
        method: "POST",
        body: formData,
      });

      const msg = await res.text();
      alert(msg);

    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">

    <div className="mb-4 flex justify-end">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        ⬅ Back
      </button>
    </div>
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-green-700 mb-6">
        📍 Field Inspection
      </h2>

      {/* MOBILE INPUT */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={fetchFarmer}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow"
        >
          🔍 Fetch Farmer
        </button>
      </div>

      {/* FARMER DETAILS */}
      {farmer && (
        <div className="bg-green-50 p-5 rounded-xl shadow mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            👤 {farmer.firstName} {farmer.lastName}
          </h3>

          <p><b>ID:</b> {farmer.id}</p>
          <p><b>Aadhaar:</b> {farmer.aadhaar}</p>
          <p><b>Crop:</b> {farmer.cropTypes}</p>

          <h4 className="mt-3 font-semibold">📦 Subsidies:</h4>

          {farmer.subsidies?.length > 0 ? (
            <ul className="list-disc ml-5">
              {[...new Set(farmer.subsidies.map(s => s.schemeName))]
                .map((scheme, i) => (
                  <li key={i}>{scheme}</li>
                ))}
            </ul>
          ) : (
            <p>No subsidies found</p>
          )}
        </div>
      )}

      {/* CAMERA SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="bg-gray-50 p-4 rounded-xl shadow">

          {!preview ? (
            <>
              <video ref={videoRef} autoPlay className="w-full h-64 object-cover rounded-lg" />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={startCamera}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  🎥 Start
                </button>

                <button
                  onClick={capturePhoto}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  📸 Capture
                </button>
              </div>
            </>
          ) : (
            <>
              <img src={preview} className="rounded-lg w-full" />

              <button
                onClick={retakePhoto}
                className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                🔁 Retake
              </button>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-gray-50 p-4 rounded-xl shadow flex flex-col justify-between">

          <div>
            <h3 className="text-lg font-semibold mb-3">📍 Location Status</h3>

            <p className="mb-2 text-gray-600">
              Location captured automatically
            </p>

            <p className="text-lg font-medium">
              {lat && lon ? (
                <span className="text-green-600">
                  ✅ Location captured successfully
                </span>
              ) : (
                <span className="text-yellow-600">
                  ⏳ Fetching location...
                </span>
              )}
            </p>
          </div>

          <button
            onClick={uploadInspection}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl shadow-lg text-lg"
          >
            🚀 Upload Inspection
          </button>

        </div>

      </div>

    </div>

  </div>
);
}
export default InspectionPage;