import db from "../config/database";

export class UsuarioRepository {
  constructor() {}

  async getByEmail(email: string) {
    return db("usuario").where({ email }).first();
  }

  async createUser(user: { nome: string; email: string; senha: string }) {
    return db("usuario").insert(user).returning("id");
  }

  async deleteUser(id: number) {
    return db("usuario").where({ id }).delete();
  }
}
