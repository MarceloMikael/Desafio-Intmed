import { Router } from "express";
import { cadastrarUsuario, loginUsuario } from '../controllers/AuthController'

const router = Router();


router.post("/login", loginUsuario);
router.post("/cadastro", cadastrarUsuario);

export default router;
