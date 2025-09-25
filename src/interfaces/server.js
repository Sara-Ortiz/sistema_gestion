import express from "express";
import usuarioRoutes from "../infrastructure/routes/usuarioRoutes.js";
import loginRoutes from "../infrastructure/routes/loginRoutes.js"
import pedidoRoutes from "../infrastructure/routes/pedidoRoutes.js"

const app = express();
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", loginRoutes)
app.use("/api/orders", pedidoRoutes)
export default app;