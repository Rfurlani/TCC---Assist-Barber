import { Schema, model } from 'mongoose';
import AgendaDomain from '../domains/agenda-domain.js';

const AgendaSchema = new Schema({
    usuarioId:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
        unique: true
    },
    agendamentos:[{
        type: Schema.Types.ObjectId,
        ref: 'agendamentos',
        required: false
    }]
})

AgendaSchema.loadClass(AgendaDomain);
const Agenda = model('agendas', AgendaSchema);
export default Agenda;