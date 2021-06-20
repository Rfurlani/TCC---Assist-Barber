import { Historico } from "../models";

class HistoricoDAO {
    constructor() {
        this.model = Historico;
    }

    async buscarPorUsuarioId(idUsuario) {
        const historico = await this.model.findOne({ usuarioId: idUsuario })
            .populate('agendamentos').exec();
        return historico;
    }

    criarHistorico(payload) {
        const historico = new this.model(payload);
        return historico.save();
    }

    salvarAgendamento(idHistorico, idAgendamento) {
        this.model.findByIdAndUpdate(
            idHistorico,
            { $push: { 'agendamentos': idAgendamento } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

}

export default HistoricoDAO;