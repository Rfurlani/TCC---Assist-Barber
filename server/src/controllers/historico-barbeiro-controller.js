import HistoricoDAO from "../repositories/historicoDAO.js";
import HistoricoController from "./historico-controller.js";

class HistoricoBarbeiroController extends HistoricoController {
    constructor() {
        super();
        this.historicoDAO = new HistoricoDAO();
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

    inserirAgendamento() {

    }

    /**
     * @description Exibir histórico
     * @api /historico-barbeiro/exibir-historico
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
}

export default HistoricoBarbeiroController;