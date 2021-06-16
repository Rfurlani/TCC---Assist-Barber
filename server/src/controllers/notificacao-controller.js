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

        this.usuarioDAO.salvarNotificacao(usuarioId, notificacao._id);
    }

    /**
     * @description Marcar como vista notificação
     */

    marcarComoVista() {

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