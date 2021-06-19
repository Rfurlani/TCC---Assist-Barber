import HistoricoDAO from "../repositories/historicoDAO.js";
import HistoricoController from "./historico-controller.js";
import AvaliacaoController from "./avaliacao-controller.js";

class HistoricoClienteController extends HistoricoController {
    constructor() {
        super();
        this.historicoDAO = new HistoricoDAO();
        this.avaliacaoController = new AvaliacaoController();
    }

    /**
     * @description Criar Histórico
     */

    async criarHistorico(usuarioId) {
        return await super.criarHistorico(usuarioId);
    }

    /**
     * @description Inserir agendamento no histórico
    */
    inserirAgendamento(idHistorico, idAgendamento) {
        super.inserirAgendamento(idHistorico, idAgendamento);
    }

    /**
     * @description Exibir histórico
     * @api /historico-cliente/exibir-historico
     * @access private
     * @type GET
     */

    async exibirHistorico(req, res) {
        try {
            const idUsuario = req.user._id;

            const historico = await super.exibirHistorico(idUsuario);

            return res.status(200).json({
                success: true,
                msg: 'Histórico pego com sucesso!',
                historico
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                msg: 'Histórico não encontrado!'
            })
        }

    }

    /**
     * @description Cria avaliação do agendamento
     */

    async avaliarBarbeiro(clienteId, barbeiroId, avaliacao) {
        return await this.avaliacaoController.avaliarBarbeiro(clienteId, barbeiroId, avaliacao);        
    }

}

export default HistoricoClienteController;