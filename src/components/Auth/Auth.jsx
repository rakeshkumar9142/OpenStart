// src/components/Auth/Auth.jsx
import React, { useState } from "react";
import { account } from "../../appwrite/appwrite.js";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      navigate("/dashboard");
    } catch (err) {
      // Show friendly message
      setError(err?.message || "Login failed, check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginReminderStyle = {
    backgroundColor: '#d1fae5', /* Subtle professional green */
    padding: '2px 4px',
    borderRadius: '4px',
    fontWeight: '600', /* Using Tailwind's equivalent `font-semibold` */
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">
      Login
      <p className="text-sm text-gray-500 text-center mt-2">
        If you are already logged in, please proceed to the{' '}
        <a href="/Dashboard" style={loginReminderStyle}>
          Dashboard
        </a>
        .
      </p>
    </h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
