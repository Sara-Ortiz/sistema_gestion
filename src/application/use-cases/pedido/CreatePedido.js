import Pedido from "../../../domain/entities/Pedido.js";
import mongoose from "mongoose"; // Para manejar las transacciones


export default class CreatePedido {
  constructor(pedidoRepository, productoRepository) {
    this.pedidoRepository = pedidoRepository;
    this.productoRepository = productoRepository;
  }
    
    async execute(pedidoData) {
        const pedido = new Pedido(pedidoData);

        // Iniciar una sesión y una transacción para la atomicidad
        // (session) -> contenedor temporal de todas las operaciones de base de datos (find, update, create) 
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            let totalPedido = 0;

            //VALIDAR STOCK
            for (const item of pedido.pedidoDetalle) {
                const productoId = item.productId;
                const cantidadPedida = item.cantidad;

                // Buscar el producto para obtener stock actual y PRECIO
                const productoDB = await this.productoRepository.findById(productoId, { session });

                if (!productoDB) {
                    throw new Error(`Producto no encontrado con ID: ${productoId}`);
                }
                
                // calcular Stock
                if (productoDB.stock < cantidadPedida) {
                    throw new Error(`Stock insuficiente para el producto ${productoDB.nombre}. Disponible: ${productoDB.stock}, Pedido: ${cantidadPedida}`);
                }

                //CALCULAR SUBTOAL
                
                item.precioUnitario = productoDB.precio; 
                item.subtotal = item.cantidad * productoDB.precio; 
                
                // Acumular al Total del encabezado
                totalPedido += item.subtotal;

                const nuevoStock = productoDB.stock - cantidadPedida;
                await this.productoRepository.update(productoId, { stock: nuevoStock }, { session }); 
            }
            
            //FIJAR TOTAL Y ESTADO INICIAL
            pedido.total = totalPedido;
            pedido.estado = true; 

            //Crear el registro del pedido
            const nuevoPedido = await this.pedidoRepository.create(pedido, { session });
            
            //Confirmar la transacción
            await session.commitTransaction();//commitTransaction 
             session.endSession();
            
            return nuevoPedido;

        } catch (error) {
            await session.abortTransaction(); // Si algo falla, abortar la transacción
            session.endSession();
            // Propagar el error al Controller
            throw error; 
        }
    }
}