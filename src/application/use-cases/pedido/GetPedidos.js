export default class GetPedidos {
    constructor(pedidoRepository) {
      this.pedidoRepository = pedidoRepository;
    }
    async execute() {
      return await this.pedidoRepository.findAll();
    }
  }