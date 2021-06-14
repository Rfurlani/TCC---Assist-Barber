import AgendaCliente from "../domains/agenda-cliente-domain.js";
import AgendaClienteDAO from '../repositories/agendaClienteDAO.js';
import autorizarOperacao from "../utils/autorizar-operacao.js";
import AgendaBarbeiroController from "./agenda-barbeiro-controller.js";
import AgendamentoController from "./agendamento-controller.js";

class AgendaClienteController {

    constructor() {
        this.agendaClienteDAO = new AgendaClienteDAO();
        this.agendamentoController = new AgendamentoController();
        this.agendaBarbeiroController = new AgendaBarbeiroController();
    }

    /**
     * @description Criar uma agenda para o cliente cadastrado
     */

    async criarAgendaCliente(idCliente) {

        let agenda = new AgendaCliente(
            [],
            idCliente
        );

        agenda = await this.agendaClienteDAO.criarAgenda(agenda);

    }

    /**
     * @description Busca informações da agenda do cliente autenticado
     * @api /agenda-cliente/buscar-agenda
     * @access private
     * @type GET
     */

    async buscarAgenda(req, res) {

        try {
            const idCliente = req.user._id;

            let agenda = await this.agendaClienteDAO.buscarPorCliente(idCliente);

            return res.status(200).json({
                agenda,
                msg: "Agenda pega com sucesso!"
            })

        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }

    /**
     * @description Cria agendamento na agenda com status de requisicao
     * @api /agenda-cliente/:idAgendaCliente/agenda-barbeiro/:idAgendaBarbeiro/solicitar-agendamento
     * @access private
     * @type POST
     */

    async solicitarAgendamento(req, res) {

        try {
            const { idAgendaCliente, idAgendaBarbeiro } = req.params;

            let agendamento = req.body;

            agendamento = await this.agendamentoController.criarAgendamento(agendamento, idAgendaCliente, idAgendaBarbeiro);

            this.agendaClienteDAO.salvarAgendamento(idAgendaCliente, agendamento._id);
            
            this.agendaBarbeiroController.salvarSolicitacao(idAgendaBarbeiro, agendamento._id);

            //emitir notificação ao barbeiro!

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
     * @description Lista da agenda escolhida
     * @api /agenda-cliente/:idAgenda/agendamentos
     * @access private
     * @type GET
     */

    async listarAgendamentos(req, res) {
        try {
            const { idAgenda } = req.params;

            let agendamentos = await this.agendamentoController.listarAgendamentosCliente(idAgenda);

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

}

export default AgendaClienteController;