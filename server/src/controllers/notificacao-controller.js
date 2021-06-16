import Notificacao from "../domains/notificacao-domain.js";
import NotificacaoDAO from "../repositories/notificacaoDAO.js";
import UsuarioDAO from "../repositories/usuarioDAO.js";

class NotificacaoController {
    constructor() {
        this.notificacaoDAO = new NotificacaoDAO();
        this.usuarioDAO = new UsuarioDAO();
    }

    /**
     * @description Criar notificação
     */

    async criarNotificacao(usuarioId, info) {
        let notificacao = new Notificacao(
            usuarioId,
            info,
            false
        )

        notificacao = await this.notificacaoDAO.salvarNotificacao(notificacao);

        const quantidade = await this.notificacaoDAO.contarNotificacoes(usuarioId);

        this.usuarioDAO.salvarNotificacao(usuarioId, notificacao._id, quantidade);
    }

    /**
     * @description Marcar como vista notificação
     */

    marcarComoVista(usuarioId, id) {
        this.notificacaoDAO.marcarComoVista(id);
    }

    /**
     * @description Excluir notificacao
     */
    excluirNotificacao() {

    }

    /**
     * @description Limpar notificações
     */
    limparNotificacoes() {

    }

}

export default NotificacaoController;