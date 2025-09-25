export default class UpdateProducto {
    constructor(productoRepository) {
      this.productoRepository = productoRepository;
    }
  
    async execute(id, productoData) {
      return await this.productoRepository.update(id, productoData);
    }
}  