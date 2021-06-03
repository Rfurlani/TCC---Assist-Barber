import { Schema, model } from 'mongoose';

const geoBarbeiroSchema = new Schema({})

const GeoBarbeiro = model("cargos", geoBarbeiroSchema);
export default GeoBarbeiro;