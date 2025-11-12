import { useState, useEffect } from "react";
import api from "../config/api";

export default function NovaConsulta({ onClose, onConsultaCriada }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [especialidade, setEspecialidade] = useState("");
  const [medico, setMedico] = useState("");
  const [agenda, setAgenda] = useState("");
  const [horario, setHorario] = useState("");

  useEffect(() => {
    api
      .get("/medicos/especialidades")
      .then((res) => setEspecialidades(res.data.data))
      .catch((err) => console.error("Erro ao buscar especialidades:", err));
  }, []);

  useEffect(() => {
    if (!especialidade) {
      setMedicos([]);
      setAgendas([]);
      setHorarios([]);
      setMedico("");
      setAgenda("");
      setHorario("");
      return;
    }

    api
      .get(`/medicos/especialidades/${especialidade}`)
      .then((res) => setMedicos(res.data.data))
      .catch((err) => console.error("Erro ao buscar médicos:", err));
  }, [especialidade]);

  useEffect(() => {
    if (!medico) {
      setAgendas([]);
      setHorarios([]);
      setAgenda("");
      setHorario("");
      return;
    }

    api
      .get(`/agendas/medicos/${medico}`)
      .then((res) => setAgendas(res.data.data))
      .catch((err) => console.error("Erro ao buscar agendas:", err));
  }, [medico]);

  useEffect(() => {
    if (!agenda) {
      setHorarios([]);
      setHorario("");
      return;
    }

    const agendaSelecionada = agendas.find((a) => a.id === Number(agenda));

    if (agendaSelecionada && Array.isArray(agendaSelecionada.horarios)) {
      setHorarios(agendaSelecionada.horarios);
    } else {
      setHorarios([]);
    }
  }, [agenda, agendas]);

  const handleAddClick = async () => {
    if (!especialidade || !medico || !agenda || !horario) {
      return;
    }

    try { 
      const agendaSelecionada = agendas.find((a) => a.id === Number(agenda));

      if (!agendaSelecionada) {
        return;
      }
      const response = await api.post("/consultas", {
        medico_id: Number(medico),
        dia: agendaSelecionada.dia,
        horario,
      });

      setEspecialidade("");
      setMedico("");
      setAgenda("");
      setHorario("");
      onClose();
      if (onConsultaCriada) {
        onConsultaCriada();
      }
    } catch (error) {
      console.error("Erro ao criar consulta:", error);
      const errorMessage = error.response?.data?.message || "Não foi possível criar a consulta.";
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-20 z-50">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white rounded shadow-lg p-6 w-[400px] z-10">
        <h2 className="text-xl font-bold mb-4 text-center">Nova Consulta</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Especialidade</label>
          <select
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Selecione a especialidade</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Médico</label>
          <select
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!especialidade || medicos.length === 0}
          >
            <option value="">
              {especialidade && medicos.length === 0
                ? "Carregando médicos..."
                : "Selecione o médico"}
            </option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Data</label>
          <select
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!medico || agendas.length === 0}
          >
            <option value="">
              {medico && agendas.length === 0
                ? "Carregando agendas..."
                : "Selecione a agenda"}
            </option>
            {agendas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.dia}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Horário</label>
          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!agenda || horarios.length === 0}
          >
            <option value="">
              {agenda && horarios.length === 0
                ? "Carregando horários..."
                : "Selecione o horário"}
            </option>
            {horarios.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 rounded bg-[#49B4BB] text-white hover:bg-[#3fa0a7]"
            disabled={!horario}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
