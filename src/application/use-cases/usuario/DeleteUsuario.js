export default class DeleteUsuario {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
    async execute(id) {
      return await this.usuarioRepository.delete(id);
    }
}  