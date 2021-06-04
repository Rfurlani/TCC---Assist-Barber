import { Schema, model } from 'mongoose';

const geoBarbeiroSchema = new Schema({
    barbeiro: {
        ref: 'usuarios',
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
    }
})

const GeoBarbeiro = model("cargos", geoBarbeiroSchema);
export default GeoBarbeiro;