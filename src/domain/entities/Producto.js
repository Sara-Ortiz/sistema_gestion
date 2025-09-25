class Producto {
  constructor({ id, nombre, descripcion, precio, stock, categoria, createdAt }) {
    if (!nombre.length < 10) throw new Error("El nombre debe tener al menos 10 caracteres");
    if (precio <= 0) throw new Error("El precio debe ser un número positivo");
    if (stock < 0) throw new Error("El stock no puede ser negativo");
    if (!categoria) throw new Error("La categoría es obligatoria");
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.createdAt = createdAt;
  }
}
export default Producto;
