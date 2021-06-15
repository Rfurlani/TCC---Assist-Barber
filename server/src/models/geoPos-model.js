import { Schema, model} from 'mongoose';
import GeoPosDomain from '../domains/geoPos-domain.js';

const geoPosSchema = new Schema({
    barbeiroId:{
        type: Schema.Types.ObjectId,
        ref: 'barbeiros',
        required: true,
        unique: true
    },
    localizacao: {
        type: {
            type: String,
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            required: true
        }
    }
})
geoPosSchema.loadClass(GeoPosDomain);
const GeoPos = model('geopos', geoPosSchema);
export default GeoPos;