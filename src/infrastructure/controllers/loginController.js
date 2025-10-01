
import LoginUsuario from "../../application/use-cases/usuario/LoginUsuario.js";
import UsuarioRepositoryMongo from "../../infrastructure/repositories/UsuarioRepositoryMongo.js";
import PasswordEncrypter from "../../infrastructure/security/password_encrypter.js";
import TokenGenerator from "../../infrastructure/security/token_generator.js";
import UsuarioModel from "../../domain/entities/Usuario.js";


// instancias de dependencias
const passwordEncrypter = new PasswordEncrypter();
const usuarioRepository = new UsuarioRepositoryMongo(UsuarioModel);
const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET || "supersecret");

const loginUsuario = new LoginUsuario(usuarioRepository, passwordEncrypter, tokenGenerator);

export default class LoginController {
  static async login(req, res) {
    try {
      const { token, user } = await loginUsuario.execute(req.body);
      res.json({ token, user });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}
