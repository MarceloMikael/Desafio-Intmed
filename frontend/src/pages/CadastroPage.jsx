import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async(e) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:3000/auth/cadastro", { nome, email, senha })
    if(data.data.usuario)
      navigate('/consultas')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar</h1>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#49B4BB] text-white py-2 rounded hover:bg-[#3fa0a7]"
          >
            Cadastrar
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
