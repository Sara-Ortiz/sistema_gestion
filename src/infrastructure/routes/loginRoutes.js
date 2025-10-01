import { Router } from "express";
import LoginController from "../controllers/loginController.js"; 
import { createUsuario } from "../controllers/usuarioController.js"; //para la función de registro


const router = Router();

// Endpoint 1: POST /api/auth/register para la creación de usuario
router.post("/register", createUsuario); 

// Endpoint 2: POST /api/auth/login para iniciar sesión
router.post("/login", LoginController.login);

export default router;
