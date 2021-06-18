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

            if(notificacao === null){
                throw new Error('Notficação não criada!');
            }
    
            const qtd = await this.notificacaoDAO.contarNotificacoes(usuarioId);

            this.usuarioDAO.salvarQuantidade(usuarioId, qtd);
    
            this.usuarioDAO.salvarNotificacao(usuarioId, notificacao._id);

            return notificacao;

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

            this.usuarioDAO.salvarQuantidade(usuarioId, qtd);

        } catch (err) {

            return err;
            
        }
    }

    /**
     * @description Excluir notificacao
     */
    async excluirNotificacao(usuarioId, id) {

        try {
            
            let notificacao = await this.notificacaoDAO.excluirNotificacao(id);

            if(notificacao === null){
                throw new Error('Notificacao não existe!')
            }

            this.usuarioDAO.removerNotificacao(usuarioId, id);

            const qtd = await this.notificacaoDAO.contarNotificacoes(usuarioId);

            this.usuarioDAO.salvarQuantidade(usuarioId, qtd);

            return notificacao;

        } catch (err) {
            
            throw err;

        }

    }

}

export default NotificacaoController;