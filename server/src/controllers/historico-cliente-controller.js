import Historico from "../domains/historico-domain.js";
import HistoricoDAO from "../repositories/historicoDAO.js";
import HistoricoController from "./historico-controller.js";

class HistoricoClienteController extends HistoricoController {
    constructor(){
        super();
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

            historico = await this.historicoDAO.salvarHistorico();


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

    exibirHistórico(){
        
    }
}

export default HistoricoClienteController;