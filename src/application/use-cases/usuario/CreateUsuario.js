

import Usuario from "../../../domain/entities/Usuario.js";

export default class CreateUsuario {
    constructor(usuarioRepository, passwordEncrypter) {
      this.usuarioRepository = usuarioRepository;
      this.passwordEncrypter = passwordEncrypter;
    }
    
    async execute(usuarioData) {
      const usuario = new Usuario(usuarioData)
      
      const { nombre, email, password, rol, createdAt } = usuario;

      // Verificar si ya existe un usuario con este email
      const existingUser = await this.usuarioRepository.findByUserEmail(email);

      if (existingUser) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      
      const hashedPassword = await this.passwordEncrypter.hashPassword(password);

      const userToSave = {
        nombre,
        email,
        password: hashedPassword, // Contraseña encriptada
        rol,
        createdAt
      };

      return await this.usuarioRepository.create(userToSave);
    }
}