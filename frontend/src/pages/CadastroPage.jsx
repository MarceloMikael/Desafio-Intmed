import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/cadastro", { nome, email, senha });
      if (response.data.usuario) {
        // Redirecionar para login após cadastro bem-sucedido
        navigate("/login", { state: { message: "Cadastro realizado com sucesso! Faça login para continuar." } });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar</h1>

        <form onSubmit={handleCadastro} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>

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
              minLength={6}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#49B4BB] text-white py-2 rounded hover:bg-[#3fa0a7] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Já tem uma conta?{" "}
            <button
              type="button"
              className="text-[#49B4BB] font-medium"
              onClick={() => navigate("/login")}
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
