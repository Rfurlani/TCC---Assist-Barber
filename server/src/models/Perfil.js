import { Schema, model } from 'mongoose';

const PerfilSchema = new Schema({
    conta:{
        ref: 'usuarios',
        type: Schema.Types.ObjectId,
    },
    imagemPerfil:{
        type: String,
        required: false,
    }
}, 
    { timestamps: true 
});

const Perfil = model("perfis", PerfilSchema);
export default Perfil;