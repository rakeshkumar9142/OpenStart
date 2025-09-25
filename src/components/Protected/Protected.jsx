import React, { useEffect, useState } from "react";
import { account } from "../../appwrite/appwrite.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    account.get()
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
