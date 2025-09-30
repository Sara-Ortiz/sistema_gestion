import CreateProducto from "../../application/use-cases/producto/CreateProducto.js";
import GetProductos from "../../application/use-cases/producto/GetProductos.js";
import GetProductoById from "../../application/use-cases/producto/GetProductoById.js";
import UpdateProducto from "../../application/use-cases/producto/UpdateProducto.js";
import DeleteProducto from "../../application/use-cases/producto/DeleteProducto.js";

import ProductoRepositoryMongo from "../repositories/ProductoRepositoryMongo.js";

const productoRepository = new ProductoRepositoryMongo();

export const createProducto = async (req, res) => {
  try {
    const createProducto = new CreateProducto(productoRepository);
    const producto = await createProducto.execute(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductos = async (req, res) => {
  try {
    const getProductos = new GetProductos(productoRepository);
    const productos = await getProductos.execute();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const getProductoById = new GetProductoById(productoRepository);
    const producto = await getProductoById.execute(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const updateProducto = new UpdateProducto(productoRepository);
    const producto = await updateProducto.execute(req.params.id, req.body);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const deleteProducto = new DeleteProducto(productoRepository);
    const result = await deleteProducto.execute(req.params.id);
    if (!result) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};