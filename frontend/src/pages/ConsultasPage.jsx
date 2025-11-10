import Header from "../components/Header";
import TabelaConsultas from "../components/TabelaConsultas";
import NovaConsulta from "../components/NovaConsulta";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ConsultasPage() {
  const [usuario] = useState("");
  const [consultas, setConsultas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const buscarConsultas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/consultas");
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };

    buscarConsultas();
  }, []);

  const handleAdd = () => setModalAberto(true);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/consultas/${id}`);
      setConsultas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
    }
  };

  const handleLogout = () => alert("Logout efetuado");

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
        />
      )}
    </div>
  );
}
