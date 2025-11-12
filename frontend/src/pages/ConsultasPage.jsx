import Header from "../components/Header";
import TabelaConsultas from "../components/TabelaConsultas";
import NovaConsulta from "../components/NovaConsulta";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../config/api";

export default function ConsultasPage({ onLogout }) {
  const [usuario, setUsuario] = useState();
  const [consultas, setConsultas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (userData && token) {
      setUsuario(JSON.parse(userData));
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        const response = await api.get("/consultas");
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        if (error.response?.status === 401) {
          onLogout();
        }
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      buscarConsultas();
    }
  }, [onLogout]);

  const handleAdd = () => setModalAberto(true);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/consultas/${id}`);
      setConsultas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      alert("Erro ao cancelar consulta. Tente novamente.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    onLogout();
    navigate("/login", { replace: true });
  };

  const handleConsultaCriada = () => {
    const buscarConsultas = async () => {
      try {
        const response = await api.get("/consultas");
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };
    buscarConsultas();
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Header usuario={usuario} onLogout={handleLogout} />
      <main className="max-w-4xl mx-auto">
        <TabelaConsultas
          consultas={consultas}
          onAdd={handleAdd}
          onCancel={handleCancel}
        />
      </main>

      {modalAberto && (
        <NovaConsulta
          onClose={() => setModalAberto(false)}
          onConsultaCriada={handleConsultaCriada}
        />
      )}
    </div>
  );
}
