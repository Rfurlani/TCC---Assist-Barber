import { Schema, model } from 'mongoose';
import AgendamentoDomain from '../domains/agendamento-domain.js';

const AgendamentoSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref:'clientes',
        required: true
    },
    barbeiro: {
        type: Schema.Types.ObjectId,
        ref:'barbeiros',
        required: true
    },
    dataHora: { type: Date,
        required: true
    },
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: true
    }]
  }, { timestamps: true });

AgendamentoSchema.loadClass(AgendamentoDomain);
const Agendamento = model('agendamentos', AgendamentoSchema);
export default Agendamento;
