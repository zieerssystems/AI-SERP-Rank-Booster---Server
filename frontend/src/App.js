import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Campaign from "./pages/Campaign";
import CreateCampaign from "./pages/CreateCampaign";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Layout from './components/Layout';
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/createcampaign" element={<CreateCampaign />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
