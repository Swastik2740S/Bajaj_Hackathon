"use client";

import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import LogNav from "../components/lognav";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const chartRef = useRef(null); // Store chart instance

  useEffect(() => {
    const userId = localStorage.getItem("uid");

    fetch("http://localhost:5000/exercise/getAllExercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        renderChart(data);
      })
      .catch((error) => console.error("Error fetching workouts:", error));

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup chart when component unmounts
      }
    };
  }, []);

  const renderChart = (workouts) => {
    const ctx = document.getElementById("workouts-chart");

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart before creating a new one
    }

    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: workouts.map((workout) => workout.nameWorkout),
          datasets: [
            {
              label: "Repetitions",
              data: workouts.map((workout) => workout.repetition),
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#ffffff",
                font: { size: 16, weight: "bold" },
              },
            },
          },
          scales: {
            x: {
              ticks: { color: "#ffffff" },
              grid: { color: "rgba(255,255,255,0.2)" },
            },
            y: {
              ticks: { color: "#ffffff" },
              grid: { color: "rgba(255,255,255,0.2)" },
            },
          },
        },
      });
    }
  };

  return (
    <div>
        <LogNav/>
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      
      <div className="text-center mb-6 animate-fadeIn" style={{ animationDuration: "1.2s" }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400">My Workouts</h1>
        <p className="text-gray-300 mt-2 text-lg">Track your progress and stay motivated!</p>
      </div>

      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
        <canvas id="workouts-chart" className="w-full h-80"></canvas>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="mt-8 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all"
      >
        Logout
      </button>
    </div>
    </div>
  );
};

export default Workouts;
