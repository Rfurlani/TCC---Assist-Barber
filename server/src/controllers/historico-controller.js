import Historico from "../domains/historico-domain.js";
import HistoricoDAO from "../repositories/historicoDAO.js";

class HistoricoController {
    constructor(){
        this.historicoDAO = new HistoricoDAO();
    }

    /**
     * @description Criar Histórico
     */

    async criarHistorico(usuarioId){
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

    inserirAgendamento(){
        
    }

    /**
     * @description Exibir histórico
     */

    async exibirHistorico(idUsuario){
        try {
            
            let historico = await this.historicoDAO.buscaroPorUsuarioId(idUsuario);

            if(historico === null){
                throw new Error('Agenda não encontrada!')
            }

            return historico;

        } catch (err) {

            return err;
        }
    }
}

export default HistoricoController;