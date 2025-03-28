import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login"; // ⬅️ Your new Login file
import RegisterPage from "./pages/RegisterPage"; // ⬅️ Your new Register file
import PropertyDetailsPage from "./pages/PropertyDetailsPage"; // Make sure this path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />

      </Routes>
    </Router>
  );
};

export default App;
