import { Notificacao } from "../models";

class NotificacaoDAO{
    constructor(){
        this.model = Notificacao;
    }

    salvarNotificacao(payload){
        let notificacao = new this.model(payload);
        return notificacao.save();
    }
}

export default NotificacaoDAO;