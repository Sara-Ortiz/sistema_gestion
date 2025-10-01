import { Router } from "express";

import {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido
} from "../controllers/pedidoController.js";

import { authMiddleware } from "../../interfaces/middlewares/authMiddleware.js";

const router = Router();
router.post("/",authMiddleware, createPedido);
router.get("/",authMiddleware, getPedidos);
router.get("/:id",authMiddleware, getPedidoById);
router.put("/:id",authMiddleware, updatePedido);
router.put("/:id/cancel",authMiddleware, updatePedido); 
router.delete("/:id", deletePedido);

export default router







