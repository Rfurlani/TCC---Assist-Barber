import {Schema, model} from 'mongoose';

const cargosSchema = new Schema({
    nome:{
        type: String,
        required: true
    }
})

const Cargos = model("cargos", cargosSchema);
export default Cargos;