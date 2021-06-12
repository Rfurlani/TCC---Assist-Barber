/*import { Schema, model } from 'mongoose';
import AgendamentoDomain from '../domains/agendamento-domain';

const AgendamentoSchema = new Schema({
    agenda:{
        type: Schema.Types.ObjectId,
        required: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        required: true
    },
    endereco:{
        type: Object,
        required: true
    },
    dataHora:{
        type: Date,
        required: true
    },
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: false
    }]
}, { timestamps: true });

AgendamentoSchema.loadClass(AgendamentoDomain);
const Agendamento = model('agendamentos', AgendamentoSchema);
export default Agendamento;*/