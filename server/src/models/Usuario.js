import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { SECRET } from '../constants';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { pick } from 'lodash';

const UsuarioSchema = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    verificado:{
        type: Boolean,
        default: false
    },
    codigoVerificacao:{
        type: String,
        required: true
    },
    redefinirSenhaToken:{
        type: String,
        required: false
    },
    redifinirSenhaExpiracao:{
        type: Date,
        required: false
    }
}, { timestamps: true });

//Criptografia de Senha
//Caso a senha seja modificada, encripte a senha
UsuarioSchema.pre("save", async function(next) {
    let usuario = this;
    if(!user.modified("password")) return next();
    usuario.senha = await hash(usuario.senha, 10);
    next()
});

//Compara senha com senha recebida
UsuarioSchema.methods.compareSenha = async function(senha) {
    return await compare(senha, this.senha);
};

//Gera JWT
UsuarioSchema.methods.gerarJWT = async function() {
    let payload = {
        email: this.email,
        nome: this.nome,
        id: this._id
    };
    return await sign(payload, SECRET, {expiresIn: "1 day"});
};

//Gera redefinição de senha 
UsuarioSchema.methods.gerarRedefinirSenha = function() {
    this.redifinirSenhaExpiracao = Date.now() + 36000000;
    this.redefinirSenhaToken = randomBytes(20).toString("hex");
}

//Retorna Informações do Usuário
UsuarioSchema.methods.getUsuarioInfo = function() {
    return pick(this, ["_id", "nome", "email"]);
}

const Usuario = model("usuarios", UsuarioSchema);
export default Usuario;