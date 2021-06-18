import Historico from "../domains/historico-domain.js";
import HistoricoDAO from "../repositories/historicoDAO.js";
import HistoricoController from "./historico-controller.js";

class HistoricoBarbeiroController extends HistoricoController{
    constructor(){
        super();
        this.historicoDAO = new HistoricoDAO();
    }

    /**
     * @description Criar Histórico
     */

    async criarHistorico(usuarioId){
        return await super.criarHistorico(usuarioId);
    }

    /**
     * @description Inserir agendamento no histórico
    */

    inserirAgendamento(){

    }

    /**
     * @description Exibir histórico
     */

    async exibirHistorico(usuarioId){
        return await super.exibirHistorico(usuarioId);
    }
}

export default HistoricoBarbeiroController;