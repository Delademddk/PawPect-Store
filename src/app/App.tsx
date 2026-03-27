import {  useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PetDashboardPage from "./pages/PetDashboardPage";

// function getIsLoggedIn() {
//   return localStorage.getItem("isLoggedIn") === "true";
// }

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <PetDashboardPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
