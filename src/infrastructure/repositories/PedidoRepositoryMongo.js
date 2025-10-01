// import {PedidoModel} from "../db/PedidoModel.js"


// class PedidoRepositoryMongo {

//   async create(pedidoData) {
//     const pedido = new PedidoModel(pedidoData);
//     return await pedido.save();
//   }

//   async findAll() {
//     return await PedidoModel.find();
//   }

//   async findById(id) {
//    return await PedidoModel.findById(id);
//   }

//   async update(id, pedidoData) {
//    return await PedidoModel.findByIdAndUpdate(id, pedidoData, { new: true });
//   }

//   async delete(id) {
//    return await PedidoModel.findByIdAndDelete(id);
//   }
  
// }

// export default PedidoRepositoryMongo;




import { PedidoModel } from "../db/PedidoModel.js"


class PedidoRepositoryMongo {

    // Soporte de Sesión: La crea o la acepta para guardar dentro de la transacción.
    async create(pedidoData, options = {}) {
        const pedido = new PedidoModel(pedidoData);
        return await pedido.save(options); 
    }

    async findAll() {
        return await PedidoModel.find();
    }

    async findById(id, options = {}) {
       // El tercer argumento es el objeto options/sesión
       return await PedidoModel.findById(id, null, options);
    }

    // Soporte de Sesión: Acepta 'options' para actualizar dentro de la transacción.
    async update(id, pedidoData, options = {}) {
       // new: true se mantiene, y se añaden las opciones de sesión
       return await PedidoModel.findByIdAndUpdate(id, pedidoData, { new: true, ...options });
    }

    async delete(id) {
       return await PedidoModel.findByIdAndDelete(id);
    }
    
}

export default PedidoRepositoryMongo;