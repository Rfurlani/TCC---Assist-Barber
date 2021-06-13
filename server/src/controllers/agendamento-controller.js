import Agendamento from '../domains/agendamento-domain.js';
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoDAO from '../repositories/agendamentoDAO.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';

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
                success: true,
                msg: "Agendamento criado com sucesso.",
                agendamento
            });

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar o agendamento."
            });
        }

    }

    /**
     * @description Listar os agendamentos de uma agenda
     * @api /agendamento/agenda/:idAgenda
     * @access private
     * @type GET
     */

     async listarAgendamentos (req, res) {
        try {

            const { idAgenda } = req.params;

            let agendamentos = await this.agendamentoDAO.buscarPorAgenda(idAgenda);

            return res.status(200).json({
                success: true,
                msg: "Agendamentos encontrados!",
                agendamentos
            });

        } catch (err) {
            console.log(err.message)
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de listar agendamentos."
            });

        }
    }

    /**

     * @description Altera e confirma ou cancela um agendamento do Barbeiro autenticado

     * @api /agendamento/:idAgendamento/agenda/:idAgenda/alterar-agendamento
     * @access private
     * @type PATCH
     */

     async confirmarAgendamento (req, res) {
        try {
            
            let { idAgenda, idAgendamento } = req.params;

            let { user, body } = req;
            
            let agenda = await this.agendaDAO.buscarPorID(idAgenda);

            const idBarbeiro = agenda.barbeiro;

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let agendamento = this.agendamentoDAO.buscarPorID(idAgendamento);

            agendamento = await this.agendamentoDAO.atualizarAgendamento(idAgendamento, body);
            
            const status = agendamento.status;

            return res.status(200).json({
                success: true,
                msg: `Agendamento foi ${status}`,
                agendamento
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar agendamento."
            });
        }
    }


}

export default AgendamentoController;
