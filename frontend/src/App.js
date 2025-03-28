import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import SuccessPage from "./pages/SuccessPage"; 
import CancelPage from "./pages/CancelPage"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Router>
  );
};

export default App;
