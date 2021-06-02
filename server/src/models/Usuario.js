import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { SECRET } from '../constants';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { pick } from 'lodash';
import { cpf } from 'cpf-cnpj-validator';

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    cargo: {
        type: String,
        required: true,
        default: "Cliente",
        enum: ["Cliente", "Barbeiro", "Admin"]
    },
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: checarCargoBarbeiro,
        validate: [cpf.isValid, 'Por favor entre com um CPF válido.']
    },
    validado: {
        type: Boolean,
        default: false
    },
    redefinirSenhaToken: {
        type: String,
        required: false
    },
    redifinirSenhaExpiracao: {
        type: Date,
        required: false
    }
}, { timestamps: true });

//Verifica se é barbeiro para habilitar CPF
function checarCargoBarbeiro() {
    if (this.cargo === "Barbeiro") {
        return true;
    } else {
        return false;
    }
}

//Criptografia de Senha
//Caso a senha seja modificada, encripte a senha
UsuarioSchema.pre("save", async function (next) {
    let usuario = this;
    if (!usuario.isModified("senha")) return next();
    usuario.senha = await hash(usuario.senha, 10);
    next()
});

//Compara senha com senha recebida
UsuarioSchema.methods.compareSenha = async function (senha) {
    return await compare(senha, this.senha);
};

//Gera JWT
UsuarioSchema.methods.gerarJWT = async function () {
    let payload = {
        id: this._id
    };
    return await sign(payload, SECRET, { expiresIn: 86400, });
};

//Gera redefinição de senha 
UsuarioSchema.methods.gerarRedefinirSenha = function () {
    this.redifinirSenhaExpiracao = Date.now() + 36000000;
    this.redefinirSenhaToken = randomBytes(20).toString("hex");
}

//Retorna Informações do Usuário
UsuarioSchema.methods.getUsuarioInfo = function () {
    return pick(this, ["_id", "nome", "email", "validado", "cargo"]);
}

const Usuario = model("usuarios", UsuarioSchema);
export default Usuario;