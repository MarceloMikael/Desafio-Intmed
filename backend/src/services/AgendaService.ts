import { AgendaRepository, Agenda } from "../repositories/AgendaRepository";

export class AgendaService {

  constructor(private agendaRepository: AgendaRepository) {}

  
  async createAgenda(agenda: Agenda): Promise<number[]> {

    const medicoExiste = await this.agendaRepository.medicoExists(agenda.medico_id);
    if (!medicoExiste) {
      throw new Error("Médico não encontrado");
    }

    const agendaExistente = await this.agendaRepository.findByMedicoAndDia(
      agenda.medico_id,
      agenda.dia
    );
    if (agendaExistente) {
      throw new Error("Já existe uma agenda para este médico neste dia");
    }

    return this.agendaRepository.createAgenda(agenda);
  }

  async deleteAgenda(id: number): Promise<void> {
    const temConsultas = await this.agendaRepository.hasConsultas(id);
    if (temConsultas) {
      throw new Error("Não é possível excluir uma agenda com consultas agendadas");
    }

    await this.agendaRepository.deleteAgenda(id);
  }

  async getByMedicoId(id: number): Promise<Agenda[] | undefined> {
    return this.agendaRepository.getByMedicoId(id);
  }

  async getAll(): Promise<Agenda[]> {
    return this.agendaRepository.getAll();
  }


    async getById(id: number): Promise<Agenda[]> {
        return this.agendaRepository.getById(id);
    }

}
