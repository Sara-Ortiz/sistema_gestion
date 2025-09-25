class Pedido {
  constructor({ id, usuarioId, total, estado, createdAt }) {
    if (total <= 0) throw new Error("El total debe ser un número positivo");
    if (!estado) throw new Error("El estado es obligatorio");
    this.id = id;
    this.usuarioId = usuarioId;
    this.total = total;
    this.estado = estado;
    this.createdAt = createdAt;
  }
}
export default Pedido;
