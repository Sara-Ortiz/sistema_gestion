export default class UpdateUsuario {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
  
    async execute(id, userData) {
      return await this.usuarioRepository.update(id, userData);
    }
}  