import Botao from "./Botao";

export default function TabelaConsultas({ consultas, onAdd, onCancel }) {
  return (<div
  className="bg-white rounded shadow-md p-4 justify-center mt-5">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Consulta Clínica</h2>
    <button onClick={onAdd} className="bg-[#49B4BB] text-white px-4 py-2 rounded hover:bg-blue-600">
      Nova Consultas
    </button>
  </div>

  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 text-left">Especialidade</th>
        <th className="p-2 text-left">Médico</th>
        <th className="p-2 text-left">Data</th>
        <th className="p-2 text-left">Hora</th>
        <th className="p-2 text-left"></th>
      </tr>
    </thead>
    <tbody>
        {consultas?.length > 0 ? (
          consultas.map((consulta) => (
            <tr key={consulta.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{consulta.medico.especialidade.nome}</td>
              <td className="p-2">{consulta.medico.nome}</td>
              <td className="p-2">{consulta.dia}</td>
              <td className="p-2">{consulta.horario}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => onCancel(consulta.id)}
                  className="text-[#49B4BB] hover:text-[#3a9298] font-medium transition"
                >
                  Desmarcar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="p-4 text-center text-gray-500">
              Nenhuma consulta encontrada
            </td>
          </tr>
        )}
      </tbody>
  </table>
</div>

  );
}
