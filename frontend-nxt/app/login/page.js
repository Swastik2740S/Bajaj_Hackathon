'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/login2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", username);

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
   <div>

    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-indigo-200 to-indigo-400"> 
        
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <span className="mr-2">👤</span>
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <span className="mr-2">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none bg-transparent"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
    </div>
  );
}
