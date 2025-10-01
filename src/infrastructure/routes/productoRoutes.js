import { Router } from "express";

import {
  createProducto,
  getProductos,
  getProductoById,
  updateProducto,
  deleteProducto
} from "../controllers/productoController.js";

import { authMiddleware } from "../../interfaces/middlewares/authMiddleware.js";

const router = Router();
router.post("/", authMiddleware, createProducto);
router.get("/", authMiddleware, getProductos);
router.get("/:id", authMiddleware, getProductoById);
router.put("/:id", authMiddleware, updateProducto);
router.delete("/:id", authMiddleware, deleteProducto);

export default router;