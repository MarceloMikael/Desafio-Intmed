import { Agenda } from "../repositories/AgendaRepository";
import { Especialidade, EspecialidadeRepository } from "../repositories/EspecialidadeRepository";
import { Medico, MedicoRepository } from "../repositories/MedicoRepository";

export class MedicoService {

    

    constructor(private repository: MedicoRepository, private especialidadeRepository: EspecialidadeRepository) {}

    async getAllEspecialidades(): Promise<Especialidade[]> {
        return this.especialidadeRepository.getAll();
    }

    async create(medico: Medico): Promise<number[]>{
        return this.repository.createMedico(medico);
    }

    async delete(id: number){
        this.repository.deleteMedico(id);
    }

    async getAll(): Promise<Medico[]> {
        return this.repository.getAll();
    }

    async getMedicosByEspecialidadeId(id: number): Promise<Medico[]> {
        return this.repository.getMedicosByEspecialidadeId(id);
    }

}