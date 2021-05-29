import mongoose from "mongoose";
const Schema = mongoose.Schema;

const servicoSchema = new Schema({
    nome:{
        type: String,
        required: [true, 'Por favor entre com o nome do produto.']
    },
    descricao:{
        type: String,
        required: [true, 'Por favor entre com a descrição do produto.']
    },
    preco:{
        type: Number,
        required: [true, 'Por favor entre com o preço do produto.']
    },
    userId:{
        type: String,
        required: [true, 'Você precisa estar logado para adicionar um servico.']
    }
},{
    timestamps: true
})

export default mongoose.model('Servico', servicoSchema);