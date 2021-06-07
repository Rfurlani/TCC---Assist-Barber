import { Schema, model } from 'mongoose';
import Barbeiro from '../domains/barbeiro-domain';

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
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: false
    }],
    cpf: {
        type: String,
        required: true,
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

BarbeiroSchema.loadClass(Barbeiro);
const BarbeiroModel = model("usuarios", BarbeiroSchema);
export default BarbeiroModel;