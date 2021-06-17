import { Schema, model } from 'mongoose';
import ServicoDomain from '../domains/servico-domain.js';

const ServicoSchema = new Schema({
    //Imagem do corte (talvez)
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true,
        default: 0
    },
    barbeiroId: {
        type: Schema.Types.ObjectId,
        ref:'barbeiros',
        required: true
    }
}, { timestamps: true });

ServicoSchema.loadClass(ServicoDomain);
const Servico = model("servicos", ServicoSchema);
export default Servico;