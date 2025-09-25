import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,//usa el nuevo parser de URL de MongoDB.
      useUnifiedTopology: true//usa el nuevo motor de monitoreo de servidores
    });
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error de conexión:", err);
    process.exit(1);
  }
};


export default connectDB;