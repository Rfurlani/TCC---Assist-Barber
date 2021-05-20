import mongoose from "mongoose";
const Schema = mongoose.Schema;

const servicos = new Schema({
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
    }
})