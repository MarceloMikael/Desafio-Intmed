import db from "../config/database";

export interface Medico {
  id?: number;
  crm: string;
  nome: string;
  email: string;
}

export class MedicoRepository {

  constructor() {}

    async getAll(): Promise<Medico[]> {
        return db('medico').select('*');
    }

    async createMedico(medico: Medico): Promise<number[]> {
        return db('medico').insert(medico).returning("id");
    }


    async deleteMedico(id: number): Promise<number> {
        return db('medico').where("id", id).delete();
    }
}
