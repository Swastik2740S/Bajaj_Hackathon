"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import Lognav from "../components/lognav";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
          setUser(jwtDecode(token));
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const updateWorkout = ({ exercise }) => {
  const router = useRouter(); // Next.js client-side navigation

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure localStorage is available
      const storedData = JSON.parse(localStorage.getItem("DBWOSettings")) || {};
      localStorage.setItem(
        "DBWOSettings",
        JSON.stringify({ ...storedData, currWorkout: exercise })
      );

      // Redirect to temp.html (replace with Next.js route if needed)
      router.push("/temp");
    }
  }, [exercise]);}

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navbar */}
      <Lognav/>

      {/* Main Content */}
      <div className="container mx-auto mt-24 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Squats Card */}
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img src="/img/squats.gif" alt="Squats" className="w-180 h-160  object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-400">Squats</h2>
              <p className="mt-2 text-gray-300">
                Begin with proper form: stand with feet shoulder-width apart, keep your back straight, 
                and engage core muscles. Lower your body until thighs are parallel to the ground. 
                Keep your knees aligned, push through heels, and return to standing.
              </p>
              <Link href="/performsquats">
                <button
                  onClick={() => updateWorkout("squat")}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Perform Squats
                </button>
              </Link>
            </div>
          </div>

          {/* Push-Ups Card */}
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img src="/img/pushups.gif" alt="Push-Ups" className="w-full h-50 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-400">Push-Ups</h2>
              <p className="mt-2 text-gray-300">
                Start in a plank position, hands slightly wider than shoulders. 
                Lower your body while keeping your back straight, then push up.
              </p>
              <Link href="/performpushups">
                <button
                  onClick={() => updateWorkout("push-up")}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Perform Pushups
                </button>
              </Link>
            </div>
          </div>

          {/* Jumping Jacks Card */}
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img src="/img/jumping-jacks.gif" alt="Jumping Jacks" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-400">Jumping Jacks</h2>
              <p className="mt-2 text-gray-300">
                Jump while spreading your legs and raising your arms overhead, then return to start position.
              </p>
              <Link href="/performjumpingjacks">
                <button
                  onClick={() => updateWorkout("jumping-jacks")}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Perform Jumping Jacks
                </button>
              </Link>
            </div>
          </div>

          {/* Lunges Card */}
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img src="/img/lunges.gif" alt="Lunges" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-400">Lunges</h2>
              <p className="mt-2 text-gray-300">
                Step forward with one leg and lower hips until both knees are bent at 90 degrees, then return.
              </p>
              <Link href="/performlunges">
                <button
                  onClick={() => updateWorkout("lunges")}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Perform Lunges
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
