import { Router } from "express";
import medicoRoutes from "./medicoRoutes";
import agendaRoutes from "./agendaRoutes";
import consultaRoutes from "./consultaRoutes";
import authRoutes from './authRoutes'

const router = Router();

router.use("/medicos", medicoRoutes);
router.use("/agendas", agendaRoutes);
router.use("/consultas", consultaRoutes);
router.use("/auth", authRoutes)

export default router;
