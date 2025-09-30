import {PedidoModel} from "../db/PedidoModel.js"


class PedidoRepositoryMongo {

  async create(pedidoData) {
    const pedido = new PedidoModel(pedidoData);
    return await pedido.save();
  }

  async findAll() {
    return await PedidoModel.find();
  }

  async findById(id) {
   return await PedidoModel.findById(id);
  }

  async update(id, pedidoData) {
   return await PedidoModel.findByIdAndUpdate(id, pedidoData, { new: true });
  }

  async delete(id) {
   return await PedidoModel.findByIdAndDelete(id);
  }
  
}

export default PedidoRepositoryMongo;