import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
  MenuItem
} from "@mui/material";
import Home from "./Home";

import SearchIcon from "@mui/icons-material/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";

import Navbar from "./Navbar";
import AboutPage from "./AboutPage";

import InspectionPage from "./InspectionPage";

import WeatherPage from "./WeatherPage";
import PesticidePage from "./PesticidePage";
const countryOptions = [
  { name: "India", code: "+91", length: 10 }
];

function EligibilityPage() {

  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState(countryOptions[0]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState("eligibility");

  // ✅ NEW STATES
  const [crop, setCrop] = useState("");
  const [schemes, setSchemes] = useState([]);

  const navigate = useNavigate();

  const isValidMobile = () => {
    const digitsOnly = /^[0-9]+$/.test(mobile);
    return digitsOnly && mobile.length === country.length;
  };

  const check = async () => {

    setData(null);
    setHistory([]);

    if (!isValidMobile()) {
      setError(`Mobile number must be ${country.length} digits`);
      return;
    }

    try {

      setError("");

      if (mode === "eligibility") {

        const response = await axios.get(
          `http://localhost:8082/eligibility/${mobile}`
        );

        setData(response.data);

        const historyRes = await axios.get(
          `http://localhost:8082/api/history/${mobile}`
        );

        setHistory(historyRes.data);

      } else if (mode === "transparency") {

        const res = await axios.get(
          `http://localhost:8082/api/transparency/${mobile}`
        );

        setData(res.data);
        setHistory([]);

      }

    } catch {
      setData(null);
      setError("Farmer not found or server error.");
    }

  };

  //  NEW FUNCTION
  const fetchSchemes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/schemes/${crop.trim()}`
      );
      setSchemes(res.data);
    } catch (error) {
      console.error("Error fetching schemes", error);
    }
  };

  return (

    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-transparent to-green-200 opacity-90 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="hidden md:block absolute left-10 bottom-20 text-6xl opacity-20"f
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          🌿
        </motion.div>
        <motion.div
          className="hidden md:block absolute right-10 top-56 text-7xl opacity-15"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        >
          🌱
        </motion.div>
        <motion.div
          className="hidden md:block absolute left-1/2 top-10 text-6xl opacity-10"
          animate={{ x: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 8 }}
        >
          🍃
        </motion.div>
        <div className="hidden md:block absolute w-72 h-72 bg-lime-200 rounded-full blur-3xl left-[-3rem] top-1/4 opacity-60"></div>
        <div className="hidden md:block absolute w-72 h-72 bg-emerald-200 rounded-full blur-3xl right-[-3rem] bottom-1/3 opacity-60"></div>
      </div>

      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-[#1a472a] to-[#2d5a3d] text-white py-4 md:py-5 px-4 md:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🌾</div>
            <div>
              <h1 className="text-2xl font-bold">Horticulture Subsidy Portal</h1>
              <p className="text-sm opacity-90">Government of India - Department of Horticulture</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-[#1a472a] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            ← Back
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 bg-white rounded-lg shadow-md border-l-4 border-[#1a472a] h-fit lg:sticky lg:top-8">
            <div className="p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1a472a] mb-6 border-b pb-4">
                📋 Navigation Menu
              </h2>
              <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-col">
                <button
                  onClick={() => setMode("eligibility")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${mode === "eligibility"
                    ? "bg-[#1a472a] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  ✅ 5 Year Policy Check
                </button>

                <button
                  onClick={() => setMode("transparency")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${mode === "transparency"
                    ? "bg-[#2d5a3d] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  👁️ Transparency Report
                </button>

                <button
                  onClick={() => setMode("schemes")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${mode === "schemes"
                    ? "bg-[#3d7a4d] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  🎯 Schemes Available
                </button>

                <button
                  onClick={() => navigate("/pesticides")}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  🌿 Pesticide Guidance
                </button>

                <button
                  onClick={() => navigate("/inspection")}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  🔍 Inspection Records
                </button>

                <button
                  onClick={() => navigate("/weather")}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  🌤️ Weather Forecast
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 md:p-8 border-t-4 border-[#1a472a]">
            {mode !== "schemes" && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <select
                    value={country.name}
                    onChange={(e) =>
                      setCountry(
                        countryOptions.find(c => c.name === e.target.value)
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent"
                  >
                    {countryOptions.map(option => (
                      <option key={option.name} value={option.name}>
                        {option.name} ({option.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="text"
                    placeholder={`Enter ${country.length} digits`}
                    value={mobile}
                    maxLength={country.length}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={check}
                    className="w-full bg-[#1a472a] text-white rounded-lg px-6 py-2 flex items-center justify-center gap-2 hover:bg-[#0d2e1a] transition font-semibold"
                  >
                    <SearchIcon size={20} />
                    CHECK
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                ⚠️ {error}
              </div>
            )}

            {mode === "eligibility" && data && (
              <div className="mt-6 p-6 bg-blue-50 border border-blue-300 rounded-lg">
                <h3 className="text-lg font-bold text-[#1a472a] mb-4">👨 Farmer Eligibility Status</h3>
                <div className="space-y-3">
                  <p className="text-[#155724] font-semibold"><span className="text-[#0b2f1d]">Name:</span> <span className="font-bold text-[#184d34]">{data.farmerName}</span></p>
                  <p className="text-[#155724] font-semibold"><span className="text-[#0b2f1d]">Last Subsidy:</span> <span className="font-bold text-[#184d34]">{data.lastSubsidyDate || "None"}</span></p>
                  <p className="text-[#155724] font-semibold"><span className="text-[#0b2f1d]">Years Since:</span> <span className="font-bold text-[#184d34]">{data.yearsSinceLastSubsidy ?? "N/A"}</span></p>
                </div>
                <div className={`mt-4 p-3 rounded-lg font-semibold ${data.eligible ? "bg-green-100 text-green-800 border border-green-300" : "bg-orange-100 text-orange-800 border border-orange-300"}`}>
                  {data.eligible ? "✅ ELIGIBLE" : "❌ NOT ELIGIBLE"} - {data.message}
                </div>
              </div>
            )}

            {mode === "eligibility" && history.length > 0 && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow border border-gray-300">
                <h2 className="text-lg font-bold text-black mb-4">📋 Subsidy History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/90 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-black">Scheme</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-black">Amount</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-black">Date</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-black">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-black">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((s, index) => (
                        <tr key={index} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-black font-bold">{s.schemeName}</td>
                          <td className="px-4 py-3 text-center text-black font-bold">₹ {(s.amount ?? 0).toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3 text-center text-black font-bold">{s.sanctionedDate}</td>
                          <td className={`px-4 py-3 text-center font-bold ${s.status === "PAID" ? "text-green-700" : "text-orange-700"}`}>
                            {s.status}
                          </td>
                          <td className="px-4 py-3 !text-black font-bold">{s.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {mode === "transparency" && data && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow border border-gray-300">
                <h2 className="text-lg font-bold text-[#1a472a] mb-4">👨 Farmer: {data.farmerName}</h2>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg min-h-44 flex flex-col justify-between shadow-sm">
                    <div>
                      <p className="text-sm text-[#4b2f52] font-semibold">Total Sanctioned</p>
                      <p className="text-3xl font-extrabold text-[#1a472a] mt-4">₹{(data?.totalSanctioned ?? 0).toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg min-h-44 flex flex-col justify-between shadow-sm">
                    <div>
                      <p className="text-sm text-[#184d34] font-semibold">Total Distributed</p>
                      <p className="text-3xl font-extrabold text-green-800 mt-4">₹{(data?.totalDistributed ?? 0).toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg min-h-44 flex flex-col justify-between shadow-sm">
                    <div>
                      <p className="text-sm text-[#b35f04] font-semibold">Pending Verification</p>
                      <p className="text-3xl font-extrabold text-orange-800 mt-4">₹{(data?.pendingAmount ?? 0).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg font-semibold mb-6 ${data.allocations?.length > 0 ? "bg-green-100 text-green-800 border border-green-300" : "bg-yellow-100 text-yellow-800 border border-yellow-300"}`}>
                  {data.allocations?.length > 0 ? "✅ This farmer has received subsidy allocations" : "⚠️ No subsidy allocations found"}
                </div>

                <div className="mt-4 p-6 bg-white rounded-lg shadow border border-gray-300">
                  <h3 className="text-lg font-bold text-black mb-4">📊 Allocation Details</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/90 border-b-2 border-gray-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-black">Scheme</th>
                          <th className="px-4 py-3 text-center text-sm font-bold text-black">Amount</th>
                          <th className="px-4 py-3 text-center text-sm font-bold text-black">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-black">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.allocations?.map((a, i) => (
                          <tr key={i} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-black font-bold">{a.schemeName}</td>
                            <td className="px-4 py-3 text-center text-black font-bold">₹ {(a.amount ?? 0).toLocaleString("en-IN")}</td>
                            <td className="px-4 py-3 text-center text-black font-bold">{a.sanctionedDate}</td>
                            <td className="px-4 py-3 !text-black font-bold">{a.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {mode === "schemes" && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow border border-gray-300">
                <h2 className="text-lg font-bold text-[#1a472a] mb-4">🌱 Scheme Recommendation</h2>
                <div className="flex gap-3 mb-6">
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent"
                  >
                    <option value="">Select Crop</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Chilli">Chilli</option>
                    <option value="Ginger">Ginger</option>
                    <option value="Arecanut">Arecanut</option>
                    <option value="Pepper">Pepper</option>
                    <option value="Coconut">Coconut</option>
                    <option value="Mango">Mango</option>
                    <option value="Cocoa">Cocoa</option>
                    <option value="Cashew">Cashew</option>
                  </select>
                  <button
                    onClick={fetchSchemes}
                    className="bg-[#1a472a] text-white px-6 py-2 rounded-lg hover:bg-[#0d2e1a] transition font-semibold"
                  >
                    Get Schemes
                  </button>
                </div>

                <div className="space-y-4">
                  {schemes.map((s, index) => (
                    <div key={index} className="p-5 border border-gray-300 rounded-lg bg-gray-50 hover:shadow-md transition">
                      <h3 className="text-base font-bold text-[#1a472a] mb-3">{s.schemeName}</h3>
                      <div className="grid md:grid-cols-2 gap-3 mb-3 text-sm">
                        <p><span className="font-semibold">💰 Subsidy:</span> ₹ {s.subsidyAmount}</p>
                        <p><span className="font-semibold">📌 Benefits:</span> {s.benefits}</p>
                        <p className="md:col-span-2"><span className="font-semibold">✅ Eligibility:</span> {s.eligibility}</p>
                        <p className="md:col-span-2"><span className="font-semibold">📄 Documents:</span> {s.documentsRequired || "Not specified"}</p>
                        <p className="md:col-span-2"><span className="font-semibold">⏱ Application Period:</span> {s.applicationPeriod || "Check official portal"}</p>
                        <p className="md:col-span-2"><span className="font-semibold">📘 Procedure:</span> {s.procedureSteps || "Follow government guidelines"}</p>
                      </div>
                      {s.applyLink && (
                        <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
                          <button className="bg-[#1a472a] text-white px-6 py-2 rounded-lg hover:bg-[#0d2e1a] transition font-semibold text-sm">
                            🔗 Apply Here
                          </button>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/portal" element={<EligibilityPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/pesticides" element={<PesticidePage />} />

        <Route path="/inspection" element={<InspectionPage />} />

        <Route path="/weather" element={<WeatherPage />} />

      </Routes>
    </Router>
  );
}

export default App;