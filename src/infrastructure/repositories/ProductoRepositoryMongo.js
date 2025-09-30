import {ProductoModel} from "../db/ProductoModel.js"

class ProductoRepositoryMongo {

  async create(productoData) {
    const producto = new ProductoModel(productoData);
    return await producto.save();
  }

  async findAll() {
    return await ProductoModel.find();
  }

  async findById(id) {
   return await ProductoModel.findById(id);
  }

  async update(id, productoData) {
   return await ProductoModel.findByIdAndUpdate(id, productoData, { new: true });
  }

  async delete(id) {
   return await ProductoModel.findByIdAndDelete(id);
  }

  // async updateStock(id, newStock) {
  //   return await ProductoModel.findByIdAndUpdate(id, { stock: newStock }, { new: true });
  // }
  
}

export default ProductoRepositoryMongo;