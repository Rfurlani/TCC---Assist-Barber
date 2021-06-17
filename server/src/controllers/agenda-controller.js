import Agenda from "../domains/agenda-domain.js";
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoController from "./agendamento-controller.js";
import autorizarOperacao from '../utils/autorizar-operacao.js';
import UsuarioDAO from "../repositories/usuarioDAO.js";
import NotificacaoController from "./notificacao-controller.js";

class AgendaController {

    constructor() {
        this.agendaDAO = new AgendaDAO();
        this.agendamentoController = new AgendamentoController();
        this.usuarioDAO = new UsuarioDAO();
        this.notificacaoController = new NotificacaoController();
    }

    /**
     * @description Criar uma agenda para o usuario cadastrado
     */

    async criarAgenda(idUsuario) {
        try {
            
            let agenda = new Agenda(
                idUsuario,
                []
            );
    
            this.agendaDAO.criarAgenda(agenda);

        } catch (err) {

            return err;
            
        }
    }

    /**
     * @description Busca informações da agenda do usuario autenticado
     * @api /agenda/get-agenda
     * @access private
     * @type GET
     */

    async getAgenda(req, res) {

        try {
            const idUsuario = req.user._id;

            let agenda = await this.agendaDAO.buscarPorUsuarioId(idUsuario);

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
     * @description Cria agendamento na agenda com status de requisicao
     * @api /agenda/:idAgendaCliente/agenda-barbeiro/:idAgendaBarbeiro/solicitar-agendamento
     * @access private
     * @type POST
     */

    async solicitarAgendamento(req, res) {

        try {
            const { idAgendaCliente, idAgendaBarbeiro } = req.params;

            let agendamento = req.body;

            const { user } = req;

            let agenda = await this.agendaDAO.buscarPorID(idAgendaBarbeiro);

            agendamento = await this.agendamentoController.criarAgendamento(agendamento, idAgendaBarbeiro, idAgendaCliente);

            this.agendaDAO.salvarAgendamento(idAgendaCliente, agendamento._id);

            this.agendaDAO.salvarAgendamento(idAgendaBarbeiro, agendamento._id);

            const info = `Solicitação de agendamento por ${user.nome}`

            this.notificacaoController.criarNotificacao(agenda.usuarioId, info);

            return res.status(201).json({
                success: true,
                msg: "Agendamento criado com sucesso.",
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
     * @description Exibir um agendamento específico
     * @api /agenda/:idAgenda/agendamento/:id
     * @access private
     * @type GET
     */

    async exibirAgendamento(req, res){
        try {
            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
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
            const { idAgenda } = req.params;

            let horarios = await this.agendaDAO.buscarHorarios(idAgenda);

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
     * @description Confirma, cancela ou finaliza um agendamento do Barbeiro autenticado
     * @api /agenda/:idAgendaBarbeiro/agendamento/:idAgendamento/alterar-agendamento
     * @access private
     * @type PATCH
     */

    async alterarAgendamento(req, res) {
        try {

            let { idAgendaBarbeiro, idAgendamento } = req.params;

            let { user, body } = req;

            const agendaBarbeiro = await this.agendaDAO.buscarPorID(idAgendaBarbeiro);

            const idUsuario = agendaBarbeiro.usuarioId;

            autorizarOperacao(idUsuario.toString(), user._id.toString());

            let agendamento = await this.agendamentoController.atualizarAgendamento(idAgendamento, body);

            const status = agendamento.status;

            const agendaCliente = await this.agendaDAO.buscarPorID(agendamento.agendaClienteId);

            console.log(agendaCliente);

            const info = `Agendamento ${status} pelo barbeiro ${user.nome}`

            switch (status) {
                case 'confirmado':

                    this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info);

                    break;

                case 'finalizado':

                    this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info);
                    //Adicionar ao histórico
                    break;

                case 'cancelado':

                    this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info);
                    //Adicionar ao histórico
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

}

export default AgendaController;