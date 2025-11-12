import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import ConsultasPage from "./pages/ConsultasPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há token no localStorage ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route
              path="/login"
              element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
            />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/consultas" element={<ConsultasPage onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/consultas" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
