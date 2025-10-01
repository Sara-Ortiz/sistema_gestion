import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required:true, minlength:4, maxlength:20},
  email: { type: String, required:true, unique:true, minlength:8, maxlength:50, match:/.+\@.+\..+/ },
  password:{ type: String, required:true , minlength:4, maxlength:60},
  rol: { type: String, required: true, enum: ["admin", "vendedor"] },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const UsuarioModel = mongoose.model("Usuario", UsuarioSchema);
