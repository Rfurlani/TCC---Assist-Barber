import { GeoPos } from "../models";

class GeoPosDAO {
	constructor() {
		this.model = GeoPos;
	}

	criarGeoPos(geoPosInfo) {
		const geoPos = new this.model(geoPosInfo);
		return geoPos.save();
	}

	// async buscarGeoPos(lng, lat, dist) {
	//     const barbeiros = await this.model.aggregate().near({
	//         near: {
	//             'type': 'Point',
	//             'coordinates': [parseFloat(lng), parseFloat(lat)],
	//         },
	//         maxDistance: parseFloat(dist),
	//         spherical: true,
	//         distanceField: "dis"
	//     }).populate('barbeiroId').exec();
	//     return barbeiros;
	// }
	async buscarGeoPos(lng, lat, dist) {
		const barbeiros = await this.model
			.where("localizacao.coordinates")
			.near({
				center: [parseInt(lng), parseInt(lat)],
				type: "Point",
				maxDistance: parseInt(dist),
				spherical: true,
			})
			.populate("barbeiroId")
			.exec();
		return barbeiros;
	}

	async atualizarLocalizacao(id, coordenadas) {
		return await this.model
			.findByIdAndUpdate(
				id,
				{
					$set: {
						localizacao: {
							type: "Point",
							coordinates: coordenadas,
						},
					},
				},
				{ upsert: true }
			)
			.exec();
	}
}

export default GeoPosDAO;
