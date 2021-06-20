import { Schema, model } from 'mongoose';
import HistoricoDomain from '../domains/historico-domain.js';

const HistoricoSchema = new Schema({
    usuarioId:{
        type: Schema.Types.ObjectId,
        ref: 'barbeiros',
        required: true,
        unique: true
    },
    agendamentos:[{
        type: Schema.Types.ObjectId,
        ref: 'agendamentos',
        required: true
    }]
});

HistoricoSchema.loadClass(HistoricoDomain);
const Historico = model('historico', HistoricoSchema);
export default Historico;