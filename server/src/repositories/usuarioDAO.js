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
                $push:{'notificacoes.notificacoes': notificacao}
            },
            { new: true }
        ).exec();
    }

    salvarQuantidade(id, qtd) {
        this.model.findByIdAndUpdate(
            id,
            {
                $set:{'notificacoes.quantidade' : qtd}
            },
            { new: true}
        ).exec();
    }

    removerNotificacao(id, idNotificacao){
        this.model.findByIdAndUpdate(
            id,
            {
                $pull:{'notificacoes.notificacoes': idNotificacao}
            },
            { new: true }
        ).exec();
    }
}

export default UsuarioDAO;