import { Schema, model } from 'mongoose';
import AgendaDomain from '../domains/agenda-domain';

const AgendaSchema = new Schema({
    barbeiro:{
        type: Schema.Types.ObjectId,
        required: true
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