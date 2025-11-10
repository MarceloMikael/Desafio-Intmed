import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function LoginPage({ onLogin, isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
        navigate("/consultas", { replace: true });
        }
    }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await axios.post('http://localhost:3000/auth/login', {email, senha},)
    console.log(data)   
    if(data.data.token){
      localStorage.setItem("usuario", JSON.stringify(data.data.usuario));
      localStorage.setItem("token", data.data.token); 
      onLogin()
      navigate("/consultas", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h1 className="text-2xl font-bold text-center mb-6">Entrar</h1>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Entrar
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
