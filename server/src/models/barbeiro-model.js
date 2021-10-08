import { Schema, model } from 'mongoose';
import BarbeiroDomain from '../domains/barbeiro-domain.js';

const BarbeiroSchema = new Schema({
    usuarioId:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        require: true,
        unique: true
    },
    cpf: {//trocar para cnpj mais tarde
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
    geoPos: {
        type: Schema.Types.ObjectId,
        ref: 'geopos',
        require: true,
    },
    agenda:{
        type: Schema.Types.ObjectId,
        ref: 'agendas',
        require: true,
    },
    avaliacao:{
        type: Number,
        required: false
    },
    sobre:{
        type: String,
        require: false,
        default:''
    }
}, { timestamps: true });

BarbeiroSchema.loadClass(BarbeiroDomain);
const Barbeiro = model('barbeiros', BarbeiroSchema);
export default Barbeiro;