import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
import {cpf} from "cpf-cnpj-validator";

const cargos = 0;

const usuarioSchema = new Schema({
    nome:{
        type: String,
        required: [true, 'Por favor entre seu nome.']
    },
    email:{
        type: String,
        required: [true, 'Por favor entre seu email.'],
        unique: true,
    },
    senha:{
        type: String,
        required: [true, 'Por favor entre uma senha.'],
        minlength: [6, 'Senha curta, entre pelo menos 6 caracteres.']
    },
    cpf:{
        type: String,
        unique: true,
        required: checarCargoBarbeiro,
        validate: [cpf.isValid, 'Por favor entre com um CPF válido.']
    },
    telefone:{
        type: String,
        required: [true, 'Por favor entre um numero telefônico.'],
        unique: true
    },
    cargo: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

//Verifica se é barbeiro para habilitar CPF
function checarCargoBarbeiro(){
    if(this.cargo === 1){
        return true;
    }else{
        return false;
    }
}

//Encriptando Senha
usuarioSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

//método estático de login
/*usuarioSchema.statics.login = async function(email, senha){
    const usuario = await this.findOne({ email });
    if(usuario){
        const auth = bcrypt.compare(senha, usuario.senha);
        if(auth){
            return usuario;
        }
    }
    throw Error('Email incorreto');
}*/

//método estático de pegar id
/*usuarioSchema.statics.getUsuario = async function(email){
    const usuario = await this.findOne({ email });
    if(usuario){
        return usuario;
    }
    throw Error('Usuário não existe.');
}*/

export default mongoose.model('Usuario', usuarioSchema);