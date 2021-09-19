import AgendaController from "./agenda-controller.js";
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoController from "./agendamento-controller.js";
import UsuarioDAO from "../repositories/usuarioDAO.js";
import NotificacaoController from "./notificacao-controller.js";
import HistoricoClienteController from "./historico-cliente-controller.js";
import BarbeiroController from "./barbeiro-controller.js";

class AgendaClienteController extends AgendaController {

    constructor() {

        super();
        this.agendaDAO = new AgendaDAO();
        this.barbeiroController = new BarbeiroController();
        this.agendamentoController = new AgendamentoController();
        this.usuarioDAO = new UsuarioDAO();
        this.notificacaoController = new NotificacaoController();
        this.historicoClienteController = new HistoricoClienteController();
    }

    /**
     * @description Criar uma agenda para o usuario cadastrado
     */

    async criarAgenda(idUsuario) {
        super.criarAgenda(idUsuario);
    }

    /** 
     * @description Busca informações da agenda do usuario autenticado
     * @api /agenda-cliente/get-agenda
     * @access private
     * @type GET
     */

    async getAgenda(req, res) {

        try {

            const idUsuario = req.user._id;

            let agenda = await super.getAgenda(idUsuario);

            if (agenda === null) {
                throw Error('Falha ao pegar agenda.')
            }

            return res.status(200).json({
                agenda,
                msg: "Agenda pega com sucesso!"
            })

        } catch (err) {

            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });

        }

    }

    /**
     * @description Cria agendamento na agenda com status de solicitacao
     * @api /agenda-cliente/:idAgendaCliente/agenda-barbeiro/:idAgendaBarbeiro/solicitar-agendamento
     * @access private
     * @type POST
     */

    async solicitarAgendamento(req, res) {

        try {
            const { idAgendaCliente, idAgendaBarbeiro } = req.params;

            const { user } = req;

            let agenda = await this.agendaDAO.buscarPorID(idAgendaBarbeiro);

            if (agenda === null) {
                throw new Error('Agenda inexistente!');
            }

            let agendamento = req.body;

            agendamento = await this.agendamentoController.criarAgendamento(agendamento, idAgendaBarbeiro, idAgendaCliente);

            this.agendaDAO.salvarAgendamento(idAgendaCliente, agendamento._id);

            this.agendaDAO.salvarAgendamento(idAgendaBarbeiro, agendamento._id);

            const info = `Solicitação de agendamento por ${user.nome}`

            this.notificacaoController.criarNotificacao(agenda.usuarioId, info);

            return res.status(201).json({
                success: true,
                msg: "Agendamento criado com sucesso.",
                agendamento
            });

        } catch (err) {
            console.log(err.message)
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar o agendamento."
            });
        }

    }

    /**
     * @description Lista horários indisponíveis
     * @api /agenda/:idAgenda/horarios
     * @access private
     * @type GET
     */

    async listarHorarios(req, res) {
        try {
            const { idAgendaBarbeiro } = req.params;

            let horarios = await this.agendaDAO.buscarHorarios(idAgendaBarbeiro);

            if (horarios === null) {
                throw Error('Horarios não encontrado!')
            }

            return res.status(200).json({
                success: true,
                msg: "Horarios encontrados!",
                horarios
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
     * @description Solicitar um cancelamento de agendamento do Cliente autenticado
     * @api /agenda-cliente/agendamento/:idAgendamento/solicitiar-cancelamento
     * @access private
     * @type PATCH
     */

    async solicitarCancelamento(req, res) {
        try {
            const { idAgendamento } = req.params;

            const { user, body } = req;

            const agendamento = await this.agendamentoController.atualizarAgendamento(idAgendamento, body);

            const info = `Agendamento de ${user.nome} no horário ${agendamento.dataHora} solicitado para ser cancelado.`;

            const notificacao = await this.notificacaoController.criarNotificacao(agendamento.agendaBarbeiroId, info);

            return res.status(200).json({
                notificacao,
                success: true,
                msg: 'Cancelamento solicitado com sucesso!',
            })

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: `Incapaz de atualizar agendamento!`
            });
        }
    }

    /**
     * @description Cria avaliação do agendamento
     * @api /agenda-cliente/historico-cliente/agendamento/:idAgendamento/criar-avaliacao/
     * @access private
     * @type POST
     */

    async avaliarBarbeiro(req, res) {
        try {
            const { idAgendamento } = req.params;

            let avaliacao = req.body;

            const clienteId = req.user._id;

            const agendamento = await this.agendamentoController.getAgendamento(idAgendamento);

            if(agendamento === null){
                throw new Error('Agendamento não encontrado!');
            }

            const agendaBarbeiro = await this.agendaDAO.buscarPorID(agendamento.agendaBarbeiroId);

            if(agendaBarbeiro == null){
                throw new Error('Agenda não encontrada!');
            }

            const barbeiroId = agendaBarbeiro.usuarioId;

            avaliacao = await this.historicoClienteController.avaliarBarbeiro(clienteId, barbeiroId, avaliacao);

            if(avaliacao === null || avaliacao === Error){
                throw new Error('Avaliacao não criada!');
            }

            this.agendamentoController.inserirAvaliacao(agendamento._id, avaliacao._id);

            return res.status(201).json({
                success: true,
                msg: 'Avaliação feita com sucesso',
                avaliacao
            })

        } catch (err) {
            let ermsg = err.message;
            console.log(err)
            return res.status(500).json({
                ermsg,
                err,
                msg: 'Um erro ocorreu ao avaliar o barbeiro!'
            })
        }
    }

}

export default AgendaClienteController;