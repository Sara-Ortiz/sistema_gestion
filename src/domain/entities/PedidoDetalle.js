class PedidoDetalle {
  constructor({ id, pedidoId, productoId, cantidad, precioUnitario, subtotal }) {
    if (cantidad <= 0) throw new Error("La cantidad debe ser un número positivo");
    if (precioUnitario <= 0) throw new Error("El precio unitario debe ser un número positivo");
    if (subtotal <= 0) throw new Error("El subtotal debe ser un número positivo");
    this.id = id;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.subtotal = subtotal;
  }
}
export default PedidoDetalle;
