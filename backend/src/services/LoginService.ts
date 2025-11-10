import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UsuarioRepository } from "../repositories/UsuarioRepository";

export class AuthLogin {
  constructor(private readonly usersRepository = new UsuarioRepository()) {}

  async cadastrar({ nome, email, senha }: { nome: string; email: string; senha: string }) {
    const existente = await this.usersRepository.getByEmail(email);
    if (existente) throw new Error("Email já cadastrado!");

    const senhaHash = await bcrypt.hash(senha, 10);

    const [id] = await this.usersRepository.createUser({
      nome,
      email,
      senha: senhaHash,
    });

    return { id, nome, email };
  }

  async login({ email, senha }: { email: string; senha: string }) {
    const user = await this.usersRepository.getByEmail(email);
    if (!user) throw new Error("Email ou senha inválido!");

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) throw new Error("Email ou senha inválido!");

    const token = jwt.sign({ id: user.id }, process.env.SECRETKEY ?? "segredo-dev", {
      expiresIn: "45m",
    });

    const novoUsuario = {
        nome: user.nome, 
        email: user.email,
        id: user.id
    }

    return {
      token,
      usuario: novoUsuario,
      expiresIn: 45 * 60,
    };
  }
}
