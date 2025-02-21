"use client";

import { useEffect, useState } from "react";
import LogNav from "../components/lognav";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to update leaderboard scores
  const updateLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/leaderboard/update", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        console.log("✅ Leaderboard updated successfully!");
        fetchLeaderboard(); // Fetch updated leaderboard
      } else {
        setError("Failed to update leaderboard.");
      }
    } catch (err) {
      console.error("❌ Error updating leaderboard:", err);
      setError("Error updating leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("http://localhost:5000/leaderboard");
      const data = await response.json();

      if (data.success) {
        setLeaderboard(data.leaderboard);
      } else {
        setError("Failed to fetch leaderboard.");
      }
    } catch (err) {
      console.error("❌ Error fetching leaderboard:", err);
      setError("Error fetching leaderboard.");
    }
  };

  // Fetch leaderboard on mount
  useEffect(() => {
    updateLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <LogNav/>
      <h1 className="text-4xl font-extrabold text-blue-500 drop-shadow-lg mb-6 animate-fadeIn">
        Leaderboard
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-300 animate-pulse">Updating leaderboard...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="w-full border-collapse bg-gray-900 shadow-xl rounded-lg">
            {/* Table Header */}
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4">Score</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } border-b transition-all hover:bg-blue-600 hover:scale-105 duration-300`}
                  >
                    <td className="p-4 text-center text-white font-bold">{index + 1}</td>
                    <td className="p-4 text-center text-gray-300">{player.emailId}</td>
                    <td className="p-4 text-center font-bold text-blue-400">{player.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-400">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={updateLeaderboard}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
      >
        Refresh Leaderboard
      </button>
    </div>
  );
};

export default Leaderboard;
