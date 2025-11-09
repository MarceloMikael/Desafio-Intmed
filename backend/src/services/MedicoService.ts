import { Medico, MedicoRepository } from "../repositories/MedicoRepository";

export class MedicoService {

    

    constructor(private repository: MedicoRepository) {}

    async create(medico: Medico): Promise<number[]>{
        return this.repository.createMedico(medico);
    }

    async delete(id: number){
        this.repository.deleteMedico(id);
    }

    async getAll(): Promise<Medico[]> {
        return this.repository.getAll();
    }

}