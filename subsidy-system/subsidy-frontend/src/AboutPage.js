import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();
  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">

      <div className="max-w-5xl bg-white shadow-2xl rounded-3xl p-10 border border-green-100">

        <h1 className="text-4xl font-bold text-emerald-700 mb-6">
          🌾 About Horticulture Subsidy Portal
        </h1>

        <div className="mb-4 flex justify-end">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            ← Back
          </button>
        </div>

        <p className="text-gray-700 text-lg leading-8 mb-5">
          The Horticulture Subsidy Portal is a smart digital platform
          developed to improve transparency, efficiency, and accessibility
          of government horticulture services for farmers.
          The system helps farmers access subsidy information,
          scheme recommendations, pesticide guidance,
          weather alerts, inspection services, and transparency reports
          through a single portal.
        </p>

        <p className="text-gray-700 text-lg leading-8 mb-5">
          The portal assists farmers in checking their eligibility for
          subsidies based on the Government's 5-Year Subsidy Policy,
          tracking previous subsidy allocations,
          and understanding the status of government assistance.
        </p>

        <p className="text-gray-700 text-lg leading-8 mb-8">
          Government officers can securely manage farmer records,
          subsidy allocations, inspections, and scheme information
          through the administrative dashboard,
          ensuring fair and transparent distribution of benefits.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-green-50 p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
              🎯 Project Objectives
            </h2>

            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Improve subsidy transparency</li>
              <li>Reduce manual verification effort</li>
              <li>Provide scheme recommendations</li>
              <li>Support weather-based decision making</li>
              <li>Offer pesticide information and guidance</li>
              <li>Enable digital inspection management</li>
            </ul>

          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
              ⚙️ Major Modules
            </h2>

            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>5-Year Subsidy Eligibility Verification</li>
              <li>Government Transparency Portal</li>
              <li>Scheme Recommendation System</li>
              <li>Pesticide Information & Nearby Shop Finder</li>
              <li>Weather Monitoring & Disease Alerts</li>
              <li>Field Inspection Management</li>
              <li>Admin Dashboard & Farmer Management</li>
            </ul>

          </div>

        </div>

        <div className="mt-8 bg-emerald-50 p-6 rounded-2xl border border-emerald-100">

          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            🚀 Benefits
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-center">

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold text-emerald-700">Farmers</h3>
              <p className="text-gray-600 mt-2">
                Easy access to subsidies, schemes and alerts.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold text-emerald-700">Government</h3>
              <p className="text-gray-600 mt-2">
                Transparent and efficient subsidy management.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold text-emerald-700">Agriculture</h3>
              <p className="text-gray-600 mt-2">
                Better planning through weather and disease monitoring.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AboutPage;