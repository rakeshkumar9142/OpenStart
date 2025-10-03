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
      .then((res) => {
        if (mounted) setUser(res);
      })
      .catch(() => {
        if (mounted) setUser(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (user === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  if (user === null) {
    // Fallback: not logged in (should be redirected by a ProtectedRoute)
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.name || "User"} 🎉
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3 mb-4">
            Account Details
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row">
              <p className="w-full sm:w-1/3 text-gray-500 font-semibold">Name</p>
              <p className="w-full sm:w-2/3 text-gray-800">{user.name || "Not provided"}</p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full sm:w-1/3 text-gray-500 font-semibold">Email</p>
              <p className="w-full sm:w-2/3 text-gray-800">{user.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full sm:w-1/3 text-gray-500 font-semibold">Phone Number</p>
              <p className="w-full sm:w-2/3 text-gray-800">
                {user.phone || "Not provided"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full sm:w-1/3 text-gray-500 font-semibold">User ID</p>
              <p className="w-full sm:w-2/3 text-gray-800 font-mono text-sm">
                {user.$id}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full sm:w-1/3 text-gray-500 font-semibold">
                Email Verified
              </p>
              <p
                className={`w-full sm:w-2/3 font-medium ${
                  user.emailVerification ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.emailVerification ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="w-full sm:w-1/3 text-gray-500 font-semibold">Joined On</p>
              <p className="w-full sm:w-2/3 text-gray-800">
                {new Date(user.registration).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

