import db from "../config/database";

export interface Especialidade {
    id: number;
    nome: string;
}

export class EspecialidadeRepository {
  constructor() {}

  async createEspecialidade(especialidade: Especialidade): Promise<number[]> {
    return db("especialidade").insert(especialidade).returning("id");
  }

  async getAll(): Promise<Especialidade[]> {
    return db("especialidade").select("*").orderBy("nome");
  }

  async deleteEspecialidade(id: number): Promise<number> {
    return db("especialidade").where("id", id).delete();
  }
}
