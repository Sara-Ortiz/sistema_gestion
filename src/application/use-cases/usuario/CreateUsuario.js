import Usuario from "../../../domain/entities/Usuario";

export default class CreateUsuario {
    constructor(usuarioRepository, passwordEncrypter) {
      this.usuarioRepository = usuarioRepository;
      this.passwordEncrypter = passwordEncrypter;
    }
  
    async execute(usuarioData) {

      const usuario = new Usuario(usuarioData)

      const { nombre, email, password, rol, createdAt } = usuario;
      // encriptar la contraseña antes de guardar
      const hashedPassword = await this.passwordEncrypter.hashPassword(password);

      const userToSave = {
      nombre,
      email,
      password: hashedPassword,
      rol,
      createdAt
    };

      return await this.usuarioRepository.create(userToSave);
    }
}  