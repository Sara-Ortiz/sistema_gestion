import mongoose from "mongoose";

const PedidoDetalleSchema = new mongoose.Schema({
  productId: {type: String, required:true},
  cantidad: {type: Number, required: true, min:1},
  precioUnitario: {type: Number, required: true},
  subtotal: {type: Number, required:true}
});

const PedidoSchema = new mongoose.Schema({
    usuarioId: {type: String, required:true},
    total: {type: Number, required:true},
    estado: {type: Boolean, required:true},
    pedidoDetalle: [PedidoDetalleSchema],
    createdAt: {type: Date, required:true, default: Date.now}
});

export const PedidoModel = mongoose.model("Pedido", PedidoSchema);
