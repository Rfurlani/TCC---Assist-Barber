import Historico from "../domains/historico-domain.js";
import HistoricoDAO from "../repositories/historicoDAO.js";

class HistoricoController {
    constructor() {
        this.historicoDAO = new HistoricoDAO();
    }

    /**
     * @description Criar Histórico
     */

    async criarHistorico(usuarioId) {
        try {

            let historico = new Historico(
                usuarioId,
                []
            )

            historico = await this.historicoDAO.criarHistorico(historico);

            return historico;

        } catch (err) {

            return err;

        }
    }

    /**
     * @description Inserir agendamento no histórico
    */

    async inserirAgendamento() {
        
        this.historicoDAO.salvarAgendamento(idHistorico, idAgendamento);
    
    }

    /**
     * @description Exibir histórico
     */

    async exibirHistorico(idUsuario) {

        let historico = await this.historicoDAO.buscarPorUsuarioId(idUsuario);

        if (historico === null) {
            throw new Error('Histórico não encontrada!')
        }

        return historico;
    }
}

export default HistoricoController;