import { Consulta, ConsultaRepository } from "../repositories/ConsultaRepository";

export class ConsultaService {
  
  constructor(private consultaRepository: ConsultaRepository) { }

  async getAll(): Promise<Consulta[]> {
    return this.consultaRepository.getAll();
  }

  async createConsulta(consulta: Consulta): Promise<number[]> {
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
      ...consulta,
      data_agendamento: new Date().toISOString(),
    };

    return this.consultaRepository.createConsulta(novaConsulta);
  }

  async deleteConsulta(id: number): Promise<void> {
    await this.consultaRepository.deleteConsulta(id);
  }
}
