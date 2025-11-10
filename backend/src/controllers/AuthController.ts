import { Request, Response } from "express";
import { AuthLogin } from "../services/LoginService";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

const userRepository = new UsuarioRepository();
const authService = new AuthLogin(userRepository);

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await authService.cadastrar({ nome, email, senha });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const usuario = await authService.login({ email, senha });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      ...usuario,
    });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};