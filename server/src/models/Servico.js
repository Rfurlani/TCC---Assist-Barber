import { Schema, model } from 'mongoose';

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
    }
}, { timestamps: true });

const Servico = model("servicos", ServicoSchema);
export default Servico;