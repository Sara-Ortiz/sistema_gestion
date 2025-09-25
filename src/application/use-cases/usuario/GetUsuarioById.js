export default class GetUsuarioById {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
    async execute(id) {
      return await this.usuarioRepository.findById(id);
    }
  }
  