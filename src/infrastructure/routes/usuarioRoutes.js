import { Router } from "express";

import {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
} from "../controllers/usuarioController.js";

import { authMiddleware } from "../../interfaces/middlewares/authMiddleware.js";

const router = Router();
router.post("/", authMiddleware, createUsuario);
router.get("/", authMiddleware, getUsuarios);
router.get("/:id", getUsuarioById);
router.put("/:id", authMiddleware, updateUsuario);
router.delete("/:id", authMiddleware, deleteUsuario);

export default router;