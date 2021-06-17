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
        this.model.findByIdAndUpdate(
            id,
        {
            $set: {'vista': true}
        },
        { new: true }).exec();
    }

    async contarNotificacoes(idUsuario){
        let qtd = await this.model.find({ usuarioId: idUsuario, vista: false }).exec();
        return qtd.length;
    }
}

export default NotificacaoDAO;