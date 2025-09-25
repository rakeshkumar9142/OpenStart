// src/components/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { account } from "../../appwrite/appwrite.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    account
      .get()
      .then((res) => { if (mounted) setUser(res); })
      .catch(() => { if (mounted) setUser(null); })
    return () => { mounted = false; };
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (user === undefined) return <p>Loading dashboard...</p>;
  if (user === null) {
    // fallback: not logged in (should be redirected by ProtectedRoute)
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name || user.email} 🎉</h1>
      <p className="text-gray-700 mt-2">Email: {user.email}</p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
