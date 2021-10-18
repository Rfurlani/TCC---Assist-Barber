import { Barbeiro } from "../models";

class BarbeiroDAO {
	constructor() {
		this.model = Barbeiro;
	}

	buscarTodos() {
		return this.model.find({}).exec();
	}

	buscarPorID(id) {
		return this.model.findById(id).populate("usuarioId").exec();
	}

	buscarIdUsuario(id) {
		return this.model.findById(id).exec();
	}

	buscarPorUsuarioId(id) {
		return this.model.findOne({ usuarioId: id }).populate("usuarioId").exec();
	}

	salvar(payload) {
		const barbeiro = new Barbeiro(payload);
		return barbeiro.save();
	}

	salvarServico(idServico, idBarbeiro) {
		this.model
			.findByIdAndUpdate(
				idBarbeiro,
				{ $push: { servicos: idServico } },
				{ new: true, useFindAndModify: false }
			)
			.exec();
	}

	removerServico(idBarbeiro, idServico) {
		this.model
			.findByIdAndUpdate(
				idBarbeiro,
				{ $pull: { servicos: idServico } },
				{ new: true, useFindAndModify: false }
			)
			.exec();
	}

	salvarGeoPos(idGeoPos, idBarbeiro) {
		this.model
			.findByIdAndUpdate(
				idBarbeiro,
				{ geoPos: idGeoPos },
				{ new: true, useFindAndModify: false }
			)
			.exec();
	}

	async atualizarBarbeiro(id, body) {
		return await this.model
			.findByIdAndUpdate(
				id,
				{...body,},
				{ new: true }
			)
			.exec();
	}

	async atualizarCertificadoBarbeiro(id, path) {
		return await this.model
			.findByIdAndUpdate(
				id,
				{certificado: path,},
				{ new: true }
			)
			.exec();
	}

	async atualizarBarbeiroAvaliacao(id, avaliacao) {
		return await this.model
			.findByIdAndUpdate(id, { avaliacao: avaliacao }, { new: true })
			.exec();
	}
}

export default BarbeiroDAO;
