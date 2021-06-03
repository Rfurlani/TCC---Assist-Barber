import { Schema, model } from 'mongoose';
import checarCargoBarbeiro from '../functions/checarCargoBarbeiro';

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
    }
},
    {
        timestamps: true
    });

const Perfil = model("perfis", PerfilSchema);
export default Perfil;