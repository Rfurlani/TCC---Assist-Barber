import { Schema, model } from 'mongoose';
import BarbeiroDomain from '../domains/barbeiro-domain.js';

const BarbeiroSchema = new Schema({
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
    cpf: {
        type: String,
        required: true,
    },
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: false
    }],
    cargo: {
        type: String,
        required: true,
        default: 'barbeiro',
        enum: ['cliente', 'barbeiro', 'admin']
    },
    geoPos: {
        type: Schema.Types.ObjectId,
        ref: 'geopos',
        require: true,
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

BarbeiroSchema.loadClass(BarbeiroDomain);
const Barbeiro = model('barbeiros', BarbeiroSchema);
export default Barbeiro;