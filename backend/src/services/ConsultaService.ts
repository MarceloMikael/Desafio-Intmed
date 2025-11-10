import { Agenda, AgendaRepository } from "../repositories/AgendaRepository";
import { Consulta, ConsultaRepository } from "../repositories/ConsultaRepository";

export class ConsultaService {
  
  constructor(private consultaRepository: ConsultaRepository, private agendaRepository: AgendaRepository) { }

  async getAll(): Promise<Consulta[]> {
    return this.consultaRepository.getAll();
  }

  async createConsulta(consulta: Consulta): Promise<Agenda[]> {
    const medicoExiste = await this.consultaRepository.medicoExists(consulta.medico_id);
    if (!medicoExiste) {
      throw new Error("Médico não encontrado");
    }
    const disponivel = await this.consultaRepository.horarioDisponivel(
      consulta.medico_id,
      consulta.dia,
      consulta.horario
    );
    if (!disponivel) {
      throw new Error("Horário já ocupado para este médico");
    }

    const novaConsulta = {
      dia: consulta.dia,
      horario: consulta.horario,
      medico_id: consulta.medico_id,
      data_agendamento: new Date().toISOString(),
    };


    const result = await this.consultaRepository.createConsulta(novaConsulta);

    await this.agendaRepository.removerHorarioDaAgenda(
      consulta.medico_id,
      consulta.dia,
      consulta.horario
    );

    return result;
  }

  async deleteConsulta(id: number): Promise<void> {
    console.log("ta ao meno chegando aqui ??", id)
    const consulta = await this.consultaRepository.findById(id);
    console.log("consulta oh:", consulta)
    if (!consulta) {
      throw new Error("Consulta não encontrada");
    }

    await this.consultaRepository.deleteConsulta(id);

    await this.agendaRepository.adicionarHorarioNaAgenda(
      consulta.medico_id,
      consulta.dia,
      consulta.horario
    );
  }

}
