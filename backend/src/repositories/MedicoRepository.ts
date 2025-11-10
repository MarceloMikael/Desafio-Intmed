import db from "../config/database";

export interface Medico {
  id?: number;
  crm: string;
  nome: string;
  email: string;
  especialidade_id: number;
}

export class MedicoRepository {

  constructor() {}

    async getAll(): Promise<Medico[]> {
        return db('medico').select('*');
    }

    async createMedico(medico: Medico): Promise<number[]> {
        return db('medico').insert(medico).returning("id");
    }

    async getMedicosByEspecialidadeId(id: number): Promise<Medico[]> {
        return db('medico as m')
        .join('especialidade as e', 'e.id', 'm.especialidade_id')
        .select('m.*')
        .where('e.id', id);
    }

    async deleteMedico(id: number): Promise<number> {
        return db('medico').where("id", id).delete();
    }
}
