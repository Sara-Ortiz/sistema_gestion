import CreatePedido from "../../application/use-cases/pedido/CreatePedido.js";
import GetPedidos from "../../application/use-cases/pedido/GetPedidos.js";
import GetPedidoById from "../../application/use-cases/pedido/GetPedidoById.js";
import UpdatePedido from "../../application/use-cases/pedido/UpdatePedido.js"; //executeCancel
import DeletePedido from "../../application/use-cases/pedido/DeletePedido.js";

import PedidoRepositoryMongo from "../repositories/PedidoRepositoryMongo.js";
import ProductoRepositoryMongo from "../repositories/ProductoRepositoryMongo.js"; 


const pedidoRepository = new PedidoRepositoryMongo();
const productoRepository = new ProductoRepositoryMongo(); 


//(Lógica de Descuento de Stock)
export const createPedido = async (req, res) => {
    try {
        const createPedido = new CreatePedido(pedidoRepository, productoRepository);
        const pedido = await createPedido.execute(req.body);
        res.status(201).json(pedido);
    } catch (err) {
        if (err.message.includes("obligatorio") || err.message.includes("Stock insuficiente")) {
            return res.status(400).json({ error: err.message }); // 400 Bad Request
        }
        
        if (err.message.includes("Producto no encontrado")) {
            return res.status(404).json({ error: err.message }); // 404 Not Found
        }
        res.status(500).json({ error: err.message });
    }
};


// (Manejo de Actualización General y Cancelación)
// La lógica interna de cancelación se mueve a UpdatePedido.executeCancel
export const updatePedido = async (req, res) => {
    try {
        const updatePedidoUseCase = new UpdatePedido(pedidoRepository, productoRepository); 
        const pedidoId = req.params.id;
        
        // Detección de la acción de cancelación por URL:
        // Verifica si la URL contiene '/cancel' para ejecutar la lógica de reversión de stock.
        const isCancelRequest = req.originalUrl.includes('/cancel');

        let pedido;

        if (isCancelRequest) {
            // Llama a executeCancel, que ya no depende del req.body.
            pedido = await updatePedidoUseCase.executeCancel(pedidoId);
            
        } else {
            // Lógica de actualización normal (sin afectar stock)
            pedido = await updatePedidoUseCase.execute(pedidoId, req.body);
        }
        
        if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);

    } catch (err) {
        // Manejo de errores específicos (ej: doble cancelación)
        if (err.message.includes("cancelado") || err.message.includes("estado inválido") || err.message.includes("use la ruta '/cancel'")) {
            return res.status(400).json({ error: err.message }); 
        }
        res.status(500).json({ error: err.message });
    }
};





export const getPedidos = async (req, res) => {
    try {
        const getPedidos = new GetPedidos(pedidoRepository);
        const pedidos = await getPedidos.execute();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPedidoById = async (req, res) => {
    try {
        const getPedidoById = new GetPedidoById(pedidoRepository);
        const pedido = await getPedidoById.execute(req.params.id);
        if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deletePedido = async (req, res) => {
    try {
        const deletePedido = new DeletePedido(pedidoRepository);
        const result = await deletePedido.execute(req.params.id);
        if (!result) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json({ message: "Pedido eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};