import { Schema, model } from 'mongoose';
import Cliente from '../domains/cliente-domain';

const ClienteSchema = new Schema({
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
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    validado: {
        type: Boolean,
        default: false
    },
    endereco:{
        type: Object,
        rua: {
            type: String,
            required: true,
        },
        bairro: {
            type: String,
            required: true,
        },
        numero:{
            type: Number,
            required: true,
        },
        cidade:{
            type: String,
            required: true
        },
        estado:{
            type: String,
            required: true,
        },
        complemento:{
            type: String
        }
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

ClienteSchema.loadClass(Cliente);
const ClienteModel = model("Clientes", ClienteSchema);
export default ClienteModel;