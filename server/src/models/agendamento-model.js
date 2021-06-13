import { Schema, model } from 'mongoose';
import AgendamentoDomain from '../domains/agendamento-domain.js';

const AgendamentoSchema = new Schema({
    agenda: {
        type: Schema.Types.ObjectId,
        ref:'agendas',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref:'clientes',
        required: true
    },
    endereco:{
        rua: {
            type: String,
            required: true,
        },
        bairro: {
            type: String,
            required: true,
        },
        numero:{
            type: String,
            required: true,
        },
        cidade:{
            type: String,
            required: true
        },
        estado:{
            type: String,
            required: true,
        },
        complemento:{
            type: String,
            required: false
        }
    },
    dataHora: { type: Date,
        required: true
    },
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: true
    }],
    status:{
        type: String,
        required: true,
        default: 'requisicao',
        enum: ['requisicao', 'agendado', 'finalizado']
    }
  }, { timestamps: true });

AgendamentoSchema.loadClass(AgendamentoDomain);
const Agendamento = model('agendamentos', AgendamentoSchema);
export default Agendamento;
