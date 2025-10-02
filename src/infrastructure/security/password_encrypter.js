import bcrypt from "bcrypt";

export default class PasswordEncrypter {
  constructor() {
    this.saltRounds = 10; //tiempo de procesamiento del hash
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}