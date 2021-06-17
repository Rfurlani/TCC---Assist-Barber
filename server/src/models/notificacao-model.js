import { Schema, model } from 'mongoose';
import NotificacaoDomain from '../domains/notificacao-domain.js';

const NotificacaoSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        require: true
    },
    informacao: {
        type: String,
        required: true
    },
    vista: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

NotificacaoSchema.loadClass(NotificacaoDomain);
const Notificacao = model("notificacoes", NotificacaoSchema);
export default Notificacao;