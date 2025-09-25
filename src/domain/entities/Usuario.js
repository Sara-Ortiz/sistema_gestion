class Usuario {
  constructor({ id, nombre, email, password, rol, createdAt }) {
    if (!nombre || nombre.length < 4) throw new Error("Nombre Invalido")
    if (!email || email.length < 8 || !email.includes("@")) throw new Error("Email Invalido")
    if (!password || password.length < 4) throw new Error("Contraseña Invalida")
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.createdAt = createdAt;
  }
}
export default Usuario;
