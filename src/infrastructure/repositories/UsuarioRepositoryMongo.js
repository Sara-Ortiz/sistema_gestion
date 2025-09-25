import {UsuarioModel} from "../db/UserModel.js"


class UsuarioRepositoryMongo {

  async create(usuarioData) {
    const user = new UsuarioModel(usuarioData);
    return await user.save();
  }

  async findAll() {
    return await UsuarioModel.find();
  }

  async findById(id) {
   return await UsuarioModel.findById(id);
  }

  async update(id, userData) {
   return await UsuarioModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
   return await UsuarioModel.findByIdAndDelete(id);
  }

  async findByUserEmail(email) {
    return await UsuarioModel.findOne({email:email});
  }
  
}

export default UsuarioRepositoryMongo;