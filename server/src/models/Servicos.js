import { Schema, model } from 'mongoose';
import Paginator from 'mongoose-paginate-v2';

const ServicoSchema = new Schema({ 
    //Imagem do corte (talvez)
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true,
        default: 0
    },
    usuarioId:{
        ref: 'usuarios',
        type: Schema.Types.ObjectId
    }
 },{ timestamps: true });

ServicoSchema.plugin(Paginator);

const Servico = model("servicos", ServicoSchema);
export default Servico;