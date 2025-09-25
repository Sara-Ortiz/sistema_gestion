export default class GetPedidoById {
    constructor(pedidoRepository) {
      this.pedidoRepository = pedidoRepository;
    }
    async execute(id) {
      return await this.pedidoRepository.findById(id);
    }
  }
  