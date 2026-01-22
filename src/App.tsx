// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/competences" element={<Skills />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
