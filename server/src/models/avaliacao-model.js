import { Schema, model } from 'mongoose';
import AvaliacaoDomain from '../domains/avaliacao-domain.js';

const AvalicaoSchema = new Schema({
    descricao: {
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref:'clientes',
        required: true
    },
    barbeiro: {
        type: Schema.Types.ObjectId,
        ref:'barbeiros',
        required: true
    }
}, { timestamps: true });

AvalicaoSchema.loadClass(AvaliacaoDomain);
const Avaliacao = model("availiacoes", AvalicaoSchema);
export default Avaliacao;