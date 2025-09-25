// src/components/Auth/ProtectedRoute.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Make sure you import 'teams' from your appwrite config
import { account, teams } from "../../appwrite/appwrite.js";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRoles = async () => {
      try {
        // 1. First, confirm the user is logged in.
        await account.get();

        // 2. Get the list of teams the user is a member of.
        const userTeams = await teams.listMemberships();

        // 3. Extract just the team names into an array.
        const userTeamNames = userTeams.memberships.map(m => m.teamName);

        // 4. Check if any of the user's teams are in the allowedRoles array.
        const isAuthorized = allowedRoles.some(role => userTeamNames.includes(role));
        
        if (isAuthorized) {
          setAuthorized(true);
        } else {
          // User is logged in but doesn't have the required role.
          // You could redirect to an "unauthorized" page or back to login.
          navigate("/login"); 
        }

      } catch (err) {
        // If account.get() or teams.listMemberships() fails, there's no session.
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    // If no roles are required, the route is protected but not role-specific.
    if (allowedRoles.length === 0) {
        // Simple authentication check without roles
        account.get()
            .then(() => setAuthorized(true))
            .catch(() => navigate("/login"))
            .finally(() => setLoading(false));
    } else {
        checkAuthAndRoles();
    }

  }, [allowedRoles, navigate]);

  if (loading) return <p>Loading...</p>;

  // Render children only if authorized is true.
  return authorized ? children : null;
};

export default ProtectedRoute;