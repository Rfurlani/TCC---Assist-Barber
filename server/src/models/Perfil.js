import { Schema, model } from 'mongoose';

const PerfilSchema = new Schema({
    conta: {
        ref: 'usuarios',
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    imagemPerfil: {
        type: String,
        required: false,
    },
    servicos: [{
        type: Schema.Types.ObjectId,
        ref: 'servicos',
        required: false
    }]
},
    {
        timestamps: true
    });

const Perfil = model("perfis", PerfilSchema);
export default Perfil;