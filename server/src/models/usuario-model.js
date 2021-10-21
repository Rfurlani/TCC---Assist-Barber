import { Schema, model } from 'mongoose';
import UsuarioDomain from '../domains/usuario-domain.js';

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
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    validado: {
        type: Boolean,
        default: false
    },
    ativo:{
        type: Boolean,
        default: false
    },
    cargo: {
        type: String,
        required: true,
        default: 'cliente',
        enum: ['cliente', 'barbeiro', 'admin']
    },
    imagemPerfil: {
        type: String,
        required: false,
        default: null
    },
    notificacoes: {
        quantidade: {
            type: Number,
            required: true,
            default: 0
        },
        notificacoes: [{
            type: Schema.Types.ObjectId,
            ref: 'notificacoes',
            require: true,
            default: []
        }]
    },
    codigoVerificacao:{
        type: String,
        default: '',
        required: false
    },
    redefinirSenhaToken: {
        type: String,
        required: false,
        default: null,
        select: false
    },
    redefinirSenhaExpiracao: {
        type: Date,
        required: false,
        default: null,
        select: false
    },
    agenda:{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'agendas',
    }
}, { timestamps: true });

UsuarioSchema.loadClass(UsuarioDomain);
const Usuario = model('usuarios', UsuarioSchema);
export default Usuario;