import { Usuario } from '../models';

class UsuarioDAO {

    constructor() {
        this.model = Usuario;
    }

    buscarTodos() {
        return this.model.find({}).exec();
    }

    buscarPorID(id) {
        return this.model.findById(id).exec();
    }

    async buscarPorEmail(email) {
        return await this.model.findOne({ email }).exec();
    }

    buscarPorEmailComSenha(email) {
        return this.model.findOne({ email }).select('+senha').exec();
    }

    salvar(payload) {
        const usuario = new Usuario(payload);
        return usuario.save();
    }

    salvarPerfil(idServico, idBarbeiro) {
        this.model.findByIdAndUpdate(
            idBarbeiro,
            { $push: { servicos: idServico } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

    async atualizarUsuario(id, body, path) {
        return await this.model.findByIdAndUpdate(
            id,
            {
                ...body,
                imagemPerfil: path
            },
            { new: true }
        ).exec();
    }

    salvarNotificacao(id, notificacao) {
        this.model.findByIdAndUpdate(
            id,
            {
                $inc:{'notificacoes.quantidade': 1},
                $push:{'notificacoes.notificacoes': notificacao}
            },
            { new: true }
        ).exec();
    }

}

export default UsuarioDAO;