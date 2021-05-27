import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import validator from "validator";

//Inicializa dotenv || variaveis ambiente
config();

//Segredo privado JWT
const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n");

//Model
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Por favor providencie um email válido."],
    required: [true, 'Campo email é obrigatório'],
    unique: true
  },
  nome: {
    type: String,
    required: [true, 'Por favor entre seu nome.'],
  },
  senha: {
    type: String,
    required: [true, "Por favor entre uma senha."],
    minlength: [6, 'Senha curta, entre pelo menos 6 caracteres.']
  },
});

//Criptografa a senha
usuarioSchema.pre("save", async function (next) {
  if (!this.senha || !this.isModified("senha")) return next;

  this.senha = await bcrypt.hash(
    this.senha,
    parseInt(process.env.HASH)
  );
  next();
});

//Deleta senha do objeto ao ser passado como JSON
usuarioSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete userObj.senha;
  return userObj;
};

//Compara senha criptografada
usuarioSchema.methods.comparePassword = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

//Gera token de verificação JWT
usuarioSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, jwtPrivateSecret, {
    expiresIn: "10d",
    algorithm: "RS256",
  });
};

//Checa se existe determinado campo e seu valor
usuarioSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await Usuario.findOne({ [`${field}`]: value });
  
    return checkField;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;