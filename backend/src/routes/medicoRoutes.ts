import { Router } from "express";
import { listarMedicos, criarMedico, excluirMedico, getAllEspecialidades, getMedicosByEspecialidadeId } from "../controllers/medicoController";

const router = Router();

router.get("/", listarMedicos);
router.post("/", criarMedico);
router.delete("/:id", excluirMedico);
router.get("/especialidades", getAllEspecialidades)
router.get("/especialidades/:id", getMedicosByEspecialidadeId)

export default router;
