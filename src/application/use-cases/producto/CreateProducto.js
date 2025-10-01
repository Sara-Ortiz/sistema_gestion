export default class CreateProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(productoData) {
    return await this.productoRepository.create(productoData);
  } 
}