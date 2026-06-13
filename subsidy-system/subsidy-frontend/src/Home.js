import React from "react";
import {
  Search,
  User,
  CloudSun,
  FlaskConical,
  ClipboardList,
  BarChart3,
  Leaf,
  Shield,
  Landmark,
  Users,
  Eye,
  Phone,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import agriLogo from "./assets/agri.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f7f4] min-h-screen">

      {/* HEADER */}

      <div className="bg-white px-4 md:px-8 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between shadow-md gap-4">

        <div className="flex items-center gap-4">

          <img
            src={agriLogo}
            alt="Logo"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-green-800 bg-white p-1 object-cover shadow-lg"
          />

          <div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#005c3a]">
              Horticulture Department Portal
            </h1>

            <p className="text-sm md:text-lg text-gray-500 mt-1">
              Transparency • Accountability • Growth
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 md:gap-8">

          <button
            onClick={() => navigate("/login")}
            className="bg-[#005c3a] text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-[#00452c] transition"
          >
            <Lock className="inline mr-2" size={18} />
            Admin Login
          </button>

        </div>

      </div>




      {/* HERO SECTION */}

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 mt-3">

        <div
          className="relative rounded-[32px] overflow-hidden shadow-2xl min-h-[360px] flex items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-transparent"></div>

          {/* Content */}

          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">

            <div className="max-w-4xl">

              <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold mb-6 shadow">
                🌱 Smart Agriculture Platform
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#005c3a] leading-[1.1]">
                Empowering Farmers,
                <br />
                Enriching Lives.
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed">
                Access subsidy eligibility verification,
                government schemes, weather forecasting,
                pesticide recommendations, inspection reports
                and transparency services from one integrated platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                  onClick={() => navigate("/portal")}
                  className="bg-gradient-to-r from-green-700 to-emerald-500 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-all"
                >
                  Enter Horticulture Portal →
                </button>

                <button
                  onClick={() => navigate("/about")}
                  className="bg-white border-2 border-green-700 text-green-700 px-10 py-3 rounded-xl text-lg font-bold hover:bg-green-50 transition"
                >
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* WHY SECTION */}

      <div className="max-w-[1700px] mx-auto py-3 px-4">

        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-[#005c3a] mb-3">
          Why Horticulture Subsidy Portal?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Users className="text-green-800" size={20} />
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#005c3a]">For Farmers</h3>
            <p className="mt-2 text-xs md:text-sm text-gray-600">
              Easily check eligibility, track subsidy status and get useful agriculture information.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Landmark className="text-green-800" size={20} />
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#005c3a]">For Government</h3>
            <p className="mt-2 text-xs md:text-sm text-gray-600">
              Ensure transparency, proper monitoring and efficient subsidy distribution.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Leaf className="text-green-800" size={20} />
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#005c3a]">For Agriculture</h3>
            <p className="mt-2 text-xs md:text-sm text-gray-600">
              Promote sustainable horticulture practices and increase farmer income.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Shield className="text-green-800" size={20} />
            </div>
            <h3 className="font-bold text-sm md:text-base text-[#005c3a]">Secure & Reliable</h3>
            <p className="mt-2 text-xs md:text-sm text-gray-600">
              Your data is safe with us. We ensure privacy and secure transactions.
            </p>
          </div>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="bg-green-900 text-white py-2 mt-2">

        <div className="max-w-7xl mx-auto text-center px-4">

          <h3 className="text-lg font-bold">
            Agrisure - Horticulture Subsidy Management System
          </h3>

          <p className="mt-2 text-sm flex items-center justify-center gap-2">
            <Phone size={16} />
            <span>Helpline: 1800 123 4567</span>
          </p>

          <p className="mt-2 text-xs opacity-70">
            © 2026 Government Horticulture Department
          </p>

        </div>

      </footer>

    </div >
  );

};

export default Home;