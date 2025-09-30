import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, minlength: 1, maxlength: 30, unique: true },
  descripcion: { type: String, required: true, minlength: 1, maxlength: 100 },
  precio: { type: mongoose.Types.Decimal128, required: true }, // Para manejar decimales con precisión
  stock: { type: Number, required: true, min: 0, integer: true },     // Asegura que sea un número entero
  categoria: { type: String, required: true, minlength: 1, maxlength: 30 },
  createdAt: { type: Date, required: true, default: Date.now }               // Mongoose crea la fecha automáticamente
});

export const ProductoModel = mongoose.model("Producto", ProductoSchema);