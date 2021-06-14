import { Schema, model } from 'mongoose';
import AgendaClienteDomain from '../domains/agenda-domain';

const AgendaClienteSchema = new Schema({
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'clientes',
        required: true,
        unique: true
    },
    agendamentos:[{
        type: Schema.Types.ObjectId,
        ref: 'agendamentos',
        required: false
    }]
})

AgendaClienteSchema.loadClass(AgendaClienteDomain);
const AgendaCliente = model('agendas-clientes', AgendaClienteSchema);
export default AgendaCliente;