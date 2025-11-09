import { Request, Response } from "express";
import { ConsultaRepository } from "../repositories/ConsultaRepository";
import { ConsultaService } from "../services/ConsultaService";

const consultaRepository = new ConsultaRepository();
const consultaService = new ConsultaService(consultaRepository);

export const listarConsultas = async (req: Request, res: Response) => {
  try {
    const consultas = await consultaService.getAll();
    return res.status(200).json(consultas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const criarConsulta = async (req: Request, res: Response) => {
  try {
    const consulta = req.body;
    const ids = await consultaService.createConsulta(consulta);
    return res.status(201).json({ id: ids[0], message: "Consulta criada com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const excluirConsulta = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await consultaService.deleteConsulta(id);
    return res.status(200).json({ message: "Consulta excluída com sucesso" });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};
