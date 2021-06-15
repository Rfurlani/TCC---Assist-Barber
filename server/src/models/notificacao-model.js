import { Schema, model } from 'mongoose';
import NotificacaoDomain from '../domains/notificacao-domain.js';

const NotificacaoSchema = new Schema({
    //Imagem do corte (talvez)
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