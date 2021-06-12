import { Schema, model } from 'mongoose';
import AgendaDomain from '../domains/agenda-domain.js';

const AgendaSchema = new Schema({
    barbeiro: {
        type: Schema.Types.ObjectId,
        ref:'barbeiros',
        required: true
    },
    agendamentos: [{
        type: Schema.Types.ObjectId,
        ref:'agendamentos',
        required: true
    }]
})

AgendaSchema.loadClass(AgendaDomain);
const Agenda = model('agendas', AgendaSchema);
export default Agenda;