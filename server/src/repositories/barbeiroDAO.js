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

    buscarPorUsuarioId(id){
        return this.model.find({usuarioId: id});
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

    removerServico(idBarbeiro, idServico) {
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

    async atualizarBarbeiro(id, body, path) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                ...body,
                certificado: path
            },
            { new: true }
        ).exec();
    }

    async atualizarBarbeiroImgPerfil(id, path) {
        return await this.model.findByIdAndUpdate(
            id,
            { imagemPerfil: path },
            { new: true }
        ).exec();
    }

}

export default BarbeiroDAO;