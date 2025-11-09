import { Router } from "express";
import { listarMedicos, criarMedico, excluirMedico } from "../controllers/medicoController";

const router = Router();

router.get("/", listarMedicos);
router.post("/", criarMedico);
router.delete("/:id", excluirMedico);

export default router;
