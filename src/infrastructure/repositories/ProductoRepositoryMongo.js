import { ProductoModel } from "../db/ProductoModel.js"

class ProductoRepositoryMongo {

    async create(productoData) {
      const producto = new ProductoModel(productoData);
      return await producto.save();
    }

    async findAll() {
      return await ProductoModel.find();
    }

    async findById(id, options = {}) {
       return await ProductoModel.findById(id, null, options);
    }

    // MODIFICADO: Acepta 'options' para transacciones (escritura)
    async update(id, productoData, options = {}) {
       return await ProductoModel.findByIdAndUpdate(id, productoData, { new: true, ...options });
    }

    async delete(id) {
       return await ProductoModel.findByIdAndDelete(id);
    }

    // ¡NUEVO MÉTODO CLAVE! Para la reversión/descuento de stock
    async updateStockIncrement(id, incrementValue, options = {}) {
        // Usa $inc para incrementar (si incrementValue es positivo)
        // o decrementar (si incrementValue es negativo) el campo 'stock'
        return await ProductoModel.findByIdAndUpdate(
            id, 
            { $inc: { stock: incrementValue } }, 
            { new: true, ...options }
        );
    }
}

export default ProductoRepositoryMongo;