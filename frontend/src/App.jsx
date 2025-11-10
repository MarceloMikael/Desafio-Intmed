import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import ConsultasPage from "./pages/ConsultasPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route
              path="/login"
              element={<LoginPage isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />}
            />

            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/consultas" element={<ConsultasPage onLogout={() => setIsLoggedIn(false)}/>} />
            <Route path="*" element={<Navigate to="/consultas" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
