import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import agriLogo from "./assets/agri.jpg";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async () => {
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8082/api/officer/login", { email, password });
            setLoading(false);
            if (res.data) {
                localStorage.setItem("officer", JSON.stringify(res.data));
                navigate("/admin");
            } else {
                setError("Invalid credentials");
            }
        } catch (e) {
            setLoading(false);
            setError("Login failed. Please try again.");
        }
    };

    return (
<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-100 flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-4xl">
        <div className="mb-6">

            <button
                onClick={() => navigate("/")}
                className="text-green-800 hover:text-green-600 transition"
            >
                <span className="text-4xl font-bold">←</span>
            </button>

        </div>

        {/* ROUND LOGO */}

        <div className="flex justify-center mb-8">

            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-600 bg-white shadow-2xl">

                <img
                    src={agriLogo}
                    alt="Horticulture Logo"
                    className="w-full h-full object-cover"
                />

            </div>

        </div>
    

        {/* TITLE */}

        <div className="text-center">

            <h1 className="text-5xl font-bold text-green-800">
                Horticulture Department Portal
            </h1>

            <p className="text-gray-600 text-xl mt-3">
                Government Subsidy Management System
            </p>

        </div>

        

        {/* LOGIN SECTION */}

        <div className="mt-14">

            <h2 className="text-4xl font-bold text-center text-gray-800">
                Officer Login
            </h2>

            <p className="text-center text-gray-600 mt-4 text-lg">
                Sign in to access the administration dashboard
            </p>

            <div className="mt-10 max-w-2xl mx-auto space-y-6">

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl bg-white/70 backdrop-blur-md border border-green-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl bg-white/70 backdrop-blur-md border border-green-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
                />

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                <button
                    onClick={login}
                    disabled={loading}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-700 to-emerald-500 text-white text-xl font-bold shadow-xl hover:scale-[1.02] transition duration-300"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
                By signing in you agree to our Terms and Privacy Policy
            </p>

        </div>

    </div>

</div>
);
}

export default LoginPage;