import Agendamento from '../domains/agendamento-domain.js';
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoDAO from '../repositories/agendamentoDAO.js';

class AgendamentoController {

    constructor() {
        this.agendaDAO = new AgendaDAO();
        this.agendamentoDAO = new AgendamentoDAO();
    }

    /**
     * @description Cria agendamento na agenda com status de requisicao
     * @api /agendamento/agenda/:idAgenda/criar-agendamento
     * @access private
     * @type POST
     */

    async criarRequisicao(req, res) {

        try {
            const { idAgenda } = req.params;

            const { dataHora, servicos } = req.body;

            const idCliente = req.user._id;

            const endereco = req.body.endereco;

            let agendamento = new Agendamento(
                idAgenda,
                idCliente,
                endereco,
                dataHora,
                servicos,
                'requisicao'
            );

            agendamento = await this.agendamentoDAO.criarAgendamento(agendamento);

            this.agendaDAO.salvarAgendamento(agendamento._id, agendamento.agenda);

            return res.status(201).json({
                agendamento,
                success: true,
                msg: "Agendamento criado com sucesso."
            });

        } catch (err) {
            const errMsg = err.message;
            return res.status(400).json({
                errMsg,
                err,
                success: false,
                msg: "Incapaz de criar o agendamento."
            });
        }

    }

    /**
     * @description Busca os agendamentos de uma agenda
     * @api /agendamento/agenda/:idAgenda
     * @access private
     * @type GET
     */



}

export default AgendamentoController;
