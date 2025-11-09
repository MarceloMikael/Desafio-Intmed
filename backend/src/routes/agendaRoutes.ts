import { Router } from "express";
import { listarAgendas, criarAgenda, excluirAgenda } from "../controllers/agendaController";

const router = Router();

router.get("/", listarAgendas);
router.post("/", criarAgenda);
router.delete("/:id", excluirAgenda);

export default router;
