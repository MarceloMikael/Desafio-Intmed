import { Request, Response } from "express";
import { MedicoRepository } from "../repositories/MedicoRepository";
import { MedicoService } from "../services/MedicoService";

const medicoRepository = new MedicoRepository();
const medicoService = new MedicoService(medicoRepository);

export const listarMedicos = async (req: Request, res: Response) => {
  try {
    const medicos = await medicoService.getAll();
    return res.status(200).json(medicos);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const criarMedico = async (req: Request, res: Response) => {
  try {
    const medico = req.body;
    const ids = await medicoService.create(medico);
    return res.status(201).json({ id: ids[0], message: "Médico criado com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const excluirMedico = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await medicoService.delete(id);
    return res.status(200).json({ message: "Médico excluído com sucesso" });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};
