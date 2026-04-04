import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetDashboardPage from "./pages/PetDashboardPage";
import Demo from "../api/index";
import { Toaster } from "sonner";

// function getIsLoggedIn() {
//   return localStorage.getItem("isLoggedIn") === "true";
// }

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  return (
    <div>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <PetDashboardPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/demo" element=<Demo /> />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
