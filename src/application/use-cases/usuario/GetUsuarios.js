export default class GetUsuarios {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
    async execute() {
      return await this.usuarioRepository.findAll();
    }
  }