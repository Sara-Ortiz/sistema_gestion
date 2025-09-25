export default class GetProductoById {
    constructor(productoRepository) {
      this.productoRepository = productoRepository;
    }
    async execute(id) {
      return await this.productoRepository.findById(id);
    }
  }
  