import { GeoPos } from "../models";

class GeoPosDAO {
	constructor() {
		this.model = GeoPos;
	}

	criarGeoPos(geoPosInfo) {
		const geoPos = new this.model(geoPosInfo);
		return geoPos.save();
	}

	excluirGeoPos(id) {
		this.model.findByIdAndDelete(id).exec();
	}

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

	async atualizarLocalizacao(barbeiroId, coordenadas) {
		return await this.model
			.findOneAndUpdate(
				barbeiroId,
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
