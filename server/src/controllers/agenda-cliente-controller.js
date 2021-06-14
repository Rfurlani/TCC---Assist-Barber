import AgendaCliente from "../domains/agenda-cliente-domain.js";
import AgendaClienteDAO from '../repositories/agendaClienteDAO.js';
import autorizarOperacao from "../utils/autorizar-operacao.js";
import AgendamentoController from "./agendamento-controller.js";

class AgendaClienteController {

    constructor() {
        this.agendaClienteDAO = new AgendaClienteDAO();
        this.agendamentoController = new AgendamentoController();
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
     * @api /agenda/cliente/buscar-agenda
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
     * @api /agenda/:idAgenda/solicitar-agendamento
     * @access private
     * @type POST
     */

    async solicitarAgendamento(req, res) {

        try {
            const { idAgenda } = req.params;

            let agendamento = req.body;

            const idCliente = req.user._id;

            agendamento = await this.agendamentoController.criarAgendamento(agendamento, idAgenda, idCliente);

            this.agendaDAO.salvarAgendamento(agendamento._id, agendamento.agenda);

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
     * @description Lista os agendamentos de sua agenda
     * @api /agenda/cliente/agendamentos
     * @access private
     * @type GET
     */

    async listarAgendamentos(req, res) {
        try {
            const { idAgenda } = req.params;

            let agendamentos = await this.agendamentoController.listarAgendamentos(idAgenda);

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
     * @description Confirma, cancela ou finaliza um agendamento do Barbeiro autenticado
     * @api /agenda/:idAgenda/agendamento/:idAgendamento/alterar-agendamento
     * @access private
     * @type PATCH
     */

    async alterarAgendamento(req, res) {
        try {

            let { idAgenda, idAgendamento } = req.params;

            let { user, body } = req;

            let agenda = await this.agendaDAO.buscarPorID(idAgenda);

            const idBarbeiro = agenda.barbeiro;

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let agendamento = await this.agendamentoController.atualizarAgendamento(idAgendamento, body);

            const status = agendamento.status;

            this.agendaDAO.salvarAgendamento(idAgendamento, idBarbeiro);

            switch (status) {
                case 'confirmado':
                    //emitir notificacao para ambos
                    console.log('Notificações confirmação!')
                    break;

                case 'finalizado' || 'cancelado':
                    //emitir notificacao para ambos e adicionar ao histórico
                    console.log('Notificações finalizado || cancelado!')
                    break;

                default:
                    throw Error('Status inválido!')
            }

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

    /**
     * 
     */

}

export default AgendaClienteController;