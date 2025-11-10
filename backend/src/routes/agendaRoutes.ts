import { Router } from "express";
import { listarAgendas, criarAgenda, excluirAgenda, getByMedicoId, getById } from "../controllers/agendaController";

const router = Router();

router.get("/", listarAgendas);
router.post("/", criarAgenda);
router.delete("/:id", excluirAgenda);
router.get('/medicos/:id', getByMedicoId)
router.get('/:id', getById)

export default router;
