import { Router } from "express";
import medicoRoutes from "./medicoRoutes";
import agendaRoutes from "./agendaRoutes";
import consultaRoutes from "./consultaRoutes";

const router = Router();

router.use("/medicos", medicoRoutes);
router.use("/agendas", agendaRoutes);
router.use("/consultas", consultaRoutes);

export default router;
