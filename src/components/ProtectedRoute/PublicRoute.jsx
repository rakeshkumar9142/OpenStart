// src/components/ProtectedRoute/PublicRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../../appwrite/appwrite.js"; // adjust path

const PublicRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined); // undefined = loading

  useEffect(() => {
    let mounted = true;
    account
      .get()
      .then(() => { if (mounted) setIsLoggedIn(true); })
      .catch(() => { if (mounted) setIsLoggedIn(false); });
    return () => { mounted = false; };
  }, []);

  if (isLoggedIn === undefined) return <p>Loading...</p>;

  // if user is already logged in, redirect to dashboard
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  return children; // show public page (login)
};

export default PublicRoute;
