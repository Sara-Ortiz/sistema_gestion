import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio:Number,
  stock:Number,
  categoria:String,
  createdAt:String,
});

const ProductoModel = mongoose.model("Producto", ProductoSchema);

class ProductoRepositoryMongo {

  async create(productoData) {
    const user = new ProductoModel(productoData);
    return await user.save();
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
  
}

export default ProductoRepositoryMongo;