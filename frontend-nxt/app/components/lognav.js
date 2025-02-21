import React from 'react';
import Link from 'next/link';

const LogNav = () => {
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-400">
        <Link href="/dashboard">FlexAI</Link>
      </h1>
      <nav className="flex space-x-6">
        <Link href="/dashboard" className="text-blue-400 hover:underline">
          Exercises
        </Link>
        <Link href="/user_activity" className="text-blue-400 hover:underline">
          Activities
        </Link>
        <Link href="/bmi" className="text-blue-400 hover:underline">
          Diet Plan Generator
        </Link>
        <Link href="/user_activity_graph" className="text-blue-400 hover:underline">
          Activity Graphs
        </Link>
        <Link href="/leaderboard" className="text-blue-400 hover:underline">
          Leaderboard
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default LogNav;
