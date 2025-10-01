class Pedido {
  constructor({ id, usuarioId, pedidoDetalle, total, estado, createdAt }) {
    if (!usuarioId) throw new Error("El ID del usuario es obligatorio para el pedido.");
    if (!total || total <= 0) throw new Error("El total debe ser un número positivo");
    if (!estado) throw new Error("El estado es obligatorio");
    this.id = id;
    this.usuarioId = usuarioId;
    this.pedidoDetalle = pedidoDetalle;
    this.total = total;
    this.estado = estado;
    this.createdAt = createdAt;
  }
}
export default Pedido;
