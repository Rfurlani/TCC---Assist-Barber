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
        try {
            let notificacao = new Notificacao(
                usuarioId,
                info,
                false
            )
    
            notificacao = await this.notificacaoDAO.salvarNotificacao(notificacao);
    
            const qtd = await this.notificacaoDAO.contarNotificacoes(usuarioId);

            this.usuarioDAO.salvarQuantidade(id, qtd);
    
            this.usuarioDAO.salvarNotificacao(usuarioId, notificacao._id);

        } catch (err) {

            return err;

        }
        
    }

    /**
     * @description Marcar como vista notificação
     */

    async marcarComoVista(usuarioId, id) {
        try {
            
            this.notificacaoDAO.marcarComoVista(id);

            const qtd = await this.notificacaoDAO.contarNotificacoes(usuarioId);

            this.usuarioDAO.salvarQuantidade(id, qtd);

        } catch (err) {

            return err;
            
        }
    }

    /**
     * @description Excluir notificacao
     */
    async excluirNotificacao(usuarioId, id) {

        try {
            
            this.notificacaoDAO.excluirNotificacao(id);

            this.usuarioDAO.removerNotificacao(usuarioId, id);

            const qtd = await this.notificacaoDAO.contarNotificacoes(usuarioId);

            this.usuarioDAO.salvarQuantidade(usuarioId, qtd);

        } catch (err) {
            
            return err;

        }

    }

    /**
     * @description Limpar notificações
     */
    limparNotificacoes(usuarioId) {

        try {
            
            this.notificacaoDAO.limparNotificacoes(usuarioId);

            this.usuarioDAO.limparNotificacoes();

            this.usuarioDAO.zerarQtdNotificacoes();

        } catch (err) {

            return err;
            
        }

    }

}

export default NotificacaoController;