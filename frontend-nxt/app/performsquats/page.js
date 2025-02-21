"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function PerformSquats() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "http://localhost:8080/temp.html";
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
      <button onClick={() => router.back()} style={{ padding: "10px", marginTop: "10px" }}>
        Go Back
      </button>
    </div>
  );
}
