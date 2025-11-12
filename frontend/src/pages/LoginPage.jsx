import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../config/api";

export default function LoginPage({ onLogin, isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/consultas", { replace: true });
    }
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [isLoggedIn, navigate, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha });
      
      if (response.data.token) {
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        localStorage.setItem("token", response.data.token);
        onLogin();
        navigate("/consultas", { replace: true });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h1 className="text-2xl font-bold text-center mb-6">Entrar</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Senha</label>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#49B4BB] text-white py-2 rounded hover:bg-[#3fa0a7] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Não tem uma conta?{" "}
            <button
              type="button"
              className="text-[#49B4BB] font-medium"
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
