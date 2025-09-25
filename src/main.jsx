import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import "./App.css";

import Team from "./components/Team/Team.jsx"
import Admin from "./components/Admin/Admin.jsx"
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import News from "./components/News/News.jsx";
import Features from "./components/Features/Features.jsx";
import Mentors from "./components/Mentors/Mentors.jsx";
import ShowCase from "./components/ShowCase/ShowCase.jsx";
import LearnMore from "./components/LearnMore/LearnMore.jsx";
import Alpha from "./components/Cohorts/Alpha/Alpha.jsx";
import Beta from "./components/Cohorts/Beta/Beta.jsx";
import Gama from "./components/Cohorts/Gama/Gama.jsx";
import Login from "./components/Auth/Auth.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Profile from "./components/Profile/Profile.jsx"

import ProtectedRoute from "./components/Protected/Protected.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="news" element={<News />} />
      <Route path="features" element={<Features />} />
      <Route path="mentors" element={<Mentors />} />
      <Route path="showcase" element={<ShowCase />} />
      <Route path="about-learn-more" element={<LearnMore />} />
      <Route path="cohorts/alpha" element={<Alpha />} />
      <Route path="cohorts/beta" element={<Beta />} />
      <Route path="cohorts/gama" element={<Gama />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route
        path="team-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Team/>
          </ProtectedRoute>
        }
      />
      <Route path="admin" element={<Admin />} />
      {/* 🔐 Role protected route */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute allowedRoles={["team", "admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
