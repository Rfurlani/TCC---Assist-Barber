import { Schema, model } from 'mongoose';
import ClienteDomain from '../domains/cliente-domain.js';

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
        select: false
    },
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    validado: {
        type: Boolean,
        default: false,
        select: false
    },
    cargo: {
        type: String,
        required: true,
        default: 'cliente',
        enum: ['cliente', 'barbeiro', 'admin']
    },
    endereco:{
        rua: {
            type: String,
            required: true,
        },
        bairro: {
            type: String,
            required: true,
        },
        numero:{
            type: String,
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
            type: String,
            required: false
        }
    },
    imagemPerfil: {
        type: String,
        required: false,
        default: null
    },
    notificacoes: [{
        type: Schema.Types.ObjectId,
        ref: 'notificacoes',
        require: true,
    }],
    redefinirSenhaToken: {
        type: String,
        required: false,
        default: null,
        select: false
    },
    redifinirSenhaExpiracao: {
        type: Date,
        required: false,
        default: null,
        select: false
    }
}, { timestamps: true });

ClienteSchema.loadClass(ClienteDomain);
const Cliente = model('clientes', ClienteSchema);
export default Cliente;