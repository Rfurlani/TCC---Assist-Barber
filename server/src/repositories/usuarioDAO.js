import { Usuario } from '../models';

class UsuarioDAO {

    constructor() {
        this.model = Usuario;
    }

    buscarTodos() {
        return this.model.find({ cargo: { $ne: "admin" }, ativo: { $ne: false } }).exec();
    }

    buscarPorID(id) {
        return this.model.findById(id).exec();
    }

    excluirPorId(id){
        return this.model.findByIdAndDelete(id).exec();
    }

    buscarBarbeirosNaoValidados(){
        return this.model.find( {cargo:'barbeiro', validado:false, ativo: true} ).exec();
    }

    async buscarPorEmail(email) {
        return await this.model.findOne({ email }).exec();
    }

    buscarPorEmailComSenha(email) {
        return this.model.findOne({ email }).select('+senha').exec();
    }

    buscarCodVerificacao(codigoVerificacao){
        return this.model.findOne({
             codigoVerificacao,
        })
    }

    buscarPorTokenSenha(redefinirSenhaToken){
        return this.model.findOne({
            redefinirSenhaToken,
            redefinirSenhaExpiracao: { $gt: Date.now() },
        })
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

    salvarNotificacao(id, notificacao, qtd) {
        this.model.findByIdAndUpdate(
            id,
            {
                $set:{'notificacoes.quantidade' : qtd},
                $push:{'notificacoes.notificacoes': notificacao}
            },
            { new: true }
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