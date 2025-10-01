
import mongoose from "mongoose";

export default class UpdatePedido {
    constructor(pedidoRepository, productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }
    
    async executeCancel(id) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const actualPedido = await this.pedidoRepository.findById(id, { session });
            
            if (!actualPedido) {
                throw new Error("Pedido no encontrado");
            }

            if (actualPedido.estado === false) {
                throw new Error("El pedido ya está cancelado y el stock ya fue revertido.");
            }
            
            // Reversión de Stock: Devolver las cantidades.
            for (const item of actualPedido.pedidoDetalle) {
                const productId = item.productId; //extraen la informacion del producto
                const cantidadDevuelta = item.cantidad; //extraen la informacion del producto
                
                // Usamos $inc de MongoDB para incrementar el stock de forma atómica
                await this.productoRepository.updateStockIncrement(
                    productId, 
                    cantidadDevuelta, 
                    { session }//hasta que el pedido también se marque como 'cancelado'
                );
            }
            
            // Actualizar el estado del pedido a 'cancelado'
            const updatedPedido = await this.pedidoRepository.update(
                id, 
                { estado: 'cancelado' }, // Forzamos el estado a cancelado
                { session }
            );

            // Confirmar la transacción
            await session.commitTransaction();
            session.endSession();

            return updatedPedido;

        } catch (error) {
            // Si algo falla, abortar la transacción y revertir todo
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }


    async execute(id, pedidoData) {
      return this.pedidoRepository.update(id, pedidoData); // Sin transacción aquí, es solo un update simple.
    }
}