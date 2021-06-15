import { Schema, model } from 'mongoose';
import BarbeiroDomain from '../domains/barbeiro-domain.js';

const BarbeiroSchema = new Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'notificacoes',
        require: true,
    },
    cpf: {
        type: String,
        required: true,
        select: false
    },
    certificado: {
        type: String,
        required: false,
        default: null
    },
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: false
    }],
    posGeo: {
        type: Schema.Types.ObjectId,
        ref: 'geopos',
        require: true,
    }
}, { timestamps: true });

BarbeiroSchema.loadClass(BarbeiroDomain);
const Barbeiro = model('barbeiros', BarbeiroSchema);
export default Barbeiro;