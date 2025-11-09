import { Router } from "express";
import { listarConsultas, criarConsulta, excluirConsulta } from "../controllers/consultaController";

const router = Router();

router.get("/", listarConsultas);
router.post("/", criarConsulta);
router.delete("/:id", excluirConsulta);

export default router;
