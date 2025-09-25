import CreateUsuario from "../../application/use-cases/usuario/CreateUsuario.js";
import GetUsuarios from "../../application/use-cases/usuario/GetUsuarios.js";
import GetUsuarioById from "../../application/use-cases/usuario/GetUsuarioById.js";
import UpdateUsuario from "../../application/use-cases/usuario/UpdateUsuario.js";
import DeleteUsuario from "../../application/use-cases/usuario/DeleteUsuario.js";

import PasswordEncrypter from "../security/password_encrypter.js"
import UsuarioRepositoryMongo from "../repositories/UsuarioRepositoryMongo.js";

const usuarioRepository = new UsuarioRepositoryMongo();
const passwordEncrypter = new PasswordEncrypter();

export const createUsuario = async (req, res) => {
  try {
    const createUsuario = new CreateUsuario(usuarioRepository, passwordEncrypter);
    const user = await createUsuario.execute(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const getUsuarios = new GetUsuarios(usuarioRepository);
    const users = await getUsuarios.execute();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const getUsuarioById = new GetUsuarioById(usuarioRepository);
    const user = await getUsuarioById.execute(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const updateUsuario = new UpdateUsuario(usuarioRepository);
    const user = await updateUsuario.execute(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const deleteUsuario = new DeleteUsuario(usuarioRepository);
    const result = await deleteUsuario.execute(req.params.id);
    if (!result) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};