import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";


import LoginPage from "./pages/Login/Login";
import AdminPage from "./pages/Admin";
import UserPage from "./pages/User";
import IntroPage from "./pages/Intro/IntroPage";

function AnimatedRoutes() {
  const location = useLocation();


  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><IntroPage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
        <Route path="/user" element={<PageWrapper><UserPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
