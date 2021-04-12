import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const cargos = {
    Admin: 0,
    Barbeiro: 1,
    Cliente: 2
}

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
        required: checarCargoBarbeiro,
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
    if(this.cargo === cargos.Barbeiro){
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

export default mongoose.model('Usuario', usuarioSchema);