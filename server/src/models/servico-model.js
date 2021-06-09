import { Schema, model } from 'mongoose';
import Servico from '../domains/servico-domain';

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
    idBarbeiro: {
        type: Schema.Types.ObjectId,
        ref:'barbeiros',
        required: true
    }
}, { timestamps: true });

ServicoSchema.loadClass(Servico);
const ServicoModel = model("servicos", ServicoSchema);
export default ServicoModel;