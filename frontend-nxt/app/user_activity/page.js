"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const userId = typeof window !== "undefined" ? localStorage.getItem("uid") : null;
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    fetch("http://localhost:5000/exercise/getAllExercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExercises(data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const formatDateTime = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleString();
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-blue-900 py-4 shadow-lg z-50">
        <div className="container mx-auto flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-white">KeepFit</h1>
          <nav className="flex gap-6">
            <a href="/dashboard" className="text-white hover:text-gray-300">Exercises</a>
            <a href="/user_activity" className="text-white hover:text-gray-300">Activities</a>
            <a href="/bmi" className="text-white hover:text-gray-300">Diet Plan</a>
            <a href="/user_activity_graph" className="text-white hover:text-gray-300">Activity Graphs</a>
            <button 
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-800"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-6">
        <h2 className="text-center text-3xl font-semibold my-8">Activities Performed</h2>
        
        {/* Exercise Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white border-collapse border border-gray-700">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-3 px-4 border border-gray-700">Exercise</th>
                <th className="py-3 px-4 border border-gray-700">Date</th>
                <th className="py-3 px-4 border border-gray-700">Duration (mins)</th>
                <th className="py-3 px-4 border border-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((row, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="py-2 px-4 border border-gray-700">{row.nameWorkout}</td>
                  <td className="py-2 px-4 border border-gray-700">{formatDateTime(row.date)}</td>
                  <td className="py-2 px-4 border border-gray-700">{row.duration}</td>
                  <td className="py-2 px-4 border border-gray-700">
                    <button
                      className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800"
                      onClick={() => setPopupData(row)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Popup */}
      {popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h4 className="text-xl font-bold">{popupData.nameWorkout}</h4>
            <p className="mt-2">Date: {formatDateTime(popupData.date)}</p>
            <p>Duration: {popupData.duration} mins</p>
            <p>Repetitions: {popupData.repetition}</p>
            <button
              className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-800"
              onClick={() => setPopupData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
