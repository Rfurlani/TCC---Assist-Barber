import { Schema, model } from 'mongoose';
import ClienteDomain from '../domains/cliente-domain.js';

const ClienteSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'notificacoes',
        require: true,
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
    }
}, { timestamps: true });

ClienteSchema.loadClass(ClienteDomain);
const Cliente = model('clientes', ClienteSchema);
export default Cliente;