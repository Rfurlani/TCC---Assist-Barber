import { Notificacao } from "../models";

class NotificacaoDAO{
    constructor(){
        this.model = Notificacao;
    }

    salvarNotificacao(payload){
        let notificacao = new this.model(payload);
        return notificacao.save();
    }

    marcarComoVista(id){
        const notificacao = this.model.findByIdAndUpdate(
            id,
        {
            $set: {'vista': true}
        },
        { new: true }).exec();

        return notificacao.vista;
    }

    async contarNotificacoes(idUsuario){
        let qtd = await this.model.find({ usuarioId: idUsuario, vista: false }).exec();
        return qtd.length;
    }

    async excluirNotificacao(id){
        let notificacao = await this.model.findByIdAndDelete(id).exec();
        return notificacao;
    }
}

export default NotificacaoDAO;