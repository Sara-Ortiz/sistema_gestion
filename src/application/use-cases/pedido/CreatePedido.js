export default class CreatePedido {
    constructor(pedidoRepository) {
      this.pedidoRepository = pedidoRepository;
    }
  
    async execute(pedidoData) {
      return await this.pedidoRepository.create(pedidoData);
    }
}  