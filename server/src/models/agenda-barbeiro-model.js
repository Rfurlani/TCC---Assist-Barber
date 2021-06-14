import { Schema, model } from 'mongoose';
import AgendaBarbeiroDomain from '../domains/agenda-barbeiro-domain.js';

const AgendaBarbeiroSchema = new Schema({
    barbeiro:{
        type: Schema.Types.ObjectId,
        ref: 'barbeiros',
        required: true,
        unique: true
    },
    agendamentos:[{
        type: Schema.Types.ObjectId,
        ref: 'agendamentos',
        required: false
    }]
})

AgendaBarbeiroSchema.loadClass(AgendaBarbeiroDomain);
const AgendaBarbeiro = model('agendas-barbeiros', AgendaBarbeiroSchema);
export default AgendaBarbeiro;