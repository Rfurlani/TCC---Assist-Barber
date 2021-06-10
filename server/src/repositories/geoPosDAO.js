import { GeoPos } from '../models';

class GeoPosDAO {

    constructor(){
        this.model = GeoPos;
    }

    criarGeoPosDAO(payload){
        const geoPos = new this.model(payload);
        return geoPos.save();
    }

    buscarGeoPos(lng, lat, raio){
        const barbeiros = this.model.aggregate().near({
            near:{
            'type': 'Point',
            'coordinates': [parseFloat(lng), parseFloat(lat)]},
            maxDistance: raio, 
            spherical: true, 
            distanceField: "dis" 
        })
        return barbeiros;
    }

    async atualizarLocalizacao(id, coordenadas){
        return await this.model.findByIdAndUpdate(
            id,
            { $set: {localizacao: coordenadas}},
            { upsert: true }
        ).exec();
    }
}

export default GeoPosDAO;