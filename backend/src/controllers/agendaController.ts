import { Request, Response } from "express";
import { AgendaRepository } from "../repositories/AgendaRepository";
import { AgendaService } from "../services/AgendaService";

const agendaRepository = new AgendaRepository();
const agendaService = new AgendaService(agendaRepository);

export const listarAgendas = async (req: Request, res: Response) => {
  try {
    const agendas = await agendaService.getAll();
    return res.status(200).json(agendas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const criarAgenda = async (req: Request, res: Response) => {
  try {
    const agenda = req.body;
    const ids = await agendaService.createAgenda(agenda);
    return res.status(201).json({ id: ids[0], message: "Agenda criada com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const excluirAgenda = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await agendaService.deleteAgenda(id);
    return res.status(200).json({ message: "Agenda excluída com sucesso" });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};
