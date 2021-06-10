import { Barbeiro } from '../models';

class BarbeiroDAO {

    constructor() {
        this.model = Barbeiro;
    }

    buscarTodos() {
        return this.model.find({}).exec();
    }

    buscarPorID(id) {
        return this.model.findById(id).exec();
    }

    buscarPorEmail(email) {
        return this.model.findOne({ email }).exec();
    }

    buscarPorEmailComSenha(email) {
        return this.model.findOne({ email }).select('+senha').exec();
    }

    salvar(payload) {
        const barbeiro = new Barbeiro(payload);
        return barbeiro.save();
    }

    salvarServico(idServico, idBarbeiro) {
        this.model.findByIdAndUpdate(
            idBarbeiro,
            { $push: { servicos: idServico } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

    removerServico(idServico, idBarbeiro) {
        this.model.findByIdAndUpdate(
            idBarbeiro,
            { $pull: { servicos: idServico } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

    salvarGeoPos(idGeoPos, idBarbeiro) {
        this.model.findByIdAndUpdate(
            idBarbeiro,
            { geoPos: idGeoPos },
            { new: true, useFindAndModify: false }
        ).exec();
    }

}

export default BarbeiroDAO;