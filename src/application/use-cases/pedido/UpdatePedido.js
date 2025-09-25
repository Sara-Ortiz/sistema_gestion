export default class UpdatePedido {
    constructor(pedidoRepository) {
      this.pedidoRepository = pedidoRepository;
    }
  
    async execute(id, pedidoData) {
      return await this.pedidoRepository.update(id, pedidoData);
    }
}  