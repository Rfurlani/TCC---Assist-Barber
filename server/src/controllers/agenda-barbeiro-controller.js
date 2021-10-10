import autorizarOperacao from '../utils/autorizar-operacao.js';
import AgendaController from "./agenda-controller.js";
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoController from "./agendamento-controller.js";
import UsuarioDAO from "../repositories/usuarioDAO.js";
import NotificacaoController from "./notificacao-controller.js";
import HistoricoBarbeiroController from './historico-barbeiro-controller.js';
import HistoricoClienteController from './historico-cliente-controller.js';

class AgendaBarbeiroController extends AgendaController {

    constructor() {
        super();
        this.agendaDAO = new AgendaDAO();
        this.agendamentoController = new AgendamentoController();
        this.usuarioDAO = new UsuarioDAO();
        this.notificacaoController = new NotificacaoController();
        this.historicoBarbeiroController = new HistoricoBarbeiroController();
        this.historicoClienteController = new HistoricoClienteController();
    }

    /**
     * @description Criar uma agenda para o usuario cadastrado
     */

    async criarAgenda(idUsuario) {
        return await super.criarAgenda(idUsuario);
    }

    /**
     * @description Busca informações da agenda do usuario autenticado
     * @api /agenda-barbeiro/get-agenda
     * @access private
     * @type GET
     */

    async getAgenda(req, res) {

        try {

            const idUsuario = req.user._id;

            let agenda = await super.getAgenda(idUsuario);

            if (!agenda._id) {
                throw Error(agenda);
            }

            return res.status(200).json({
                success: true,
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
     * @description Retorna agendamento solicitado
     * @api /agenda-barbeiro/agendamento/:id
     * @access private
     * @type GET
     */

    async getAgendamento(req, res){
        try {
            const {id} = req.params;

            let agendamento = await super.getAgendamento(id);

            if(!agendamento._id){
                throw Error(agendamento);
            }
            console.log(agendamento)
            return res.status(200).json({
                success: true,
                agendamento,
                msg: "Agendamento resgatado com sucesso!"
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            })
        }
    }

    /**
     * @description Confirma, cancela ou finaliza um agendamento do Barbeiro autenticado
     * @api /agenda/:idAgendaBarbeiro/agendamento/:idAgendamento/gerenciar-agendamento
     * @access private
     * @type PATCH
     */

    async gerenciarAgendamento(req, res) {
        try {

            const { idAgendaBarbeiro, idAgendamento } = req.params;

            const { user, body } = req;

            const agendaBarbeiro = await this.agendaDAO.buscarPorID(idAgendaBarbeiro);

            const idUsuario = agendaBarbeiro.usuarioId;

            autorizarOperacao(idUsuario.toString(), user._id.toString());

            let agendamento = await this.agendamentoController.atualizarAgendamento(idAgendamento, body);

            const status = agendamento.status;

            const agendaCliente = await this.agendaDAO.buscarPorID(agendamento.agendaClienteId);

            const info = `Agendamento ${status} pelo barbeiro ${user.nome}`

            /**let historicoBarb, historicoCli;

            switch (status) {
                case 'confirmado':

                    this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info);

                    break;

                case 'finalizado':

                    historicoBarb = await this.historicoBarbeiroController.buscarHistorico(idUsuario);
                    historicoCli = await this.historicoBarbeiroController.buscarHistorico(agendaCliente.usuarioId);
                    this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info);
                    this.historicoBarbeiroController.inserirAgendamento(historicoBarb._id, agendamento._id);
                    this.historicoClienteController.inserirAgendamento(historicoCli._id, agendamento._id);

                    break;

                case 'cancelado':

                    historicoBarb = await this.historicoBarbeiroController.buscarHistorico(idUsuario);
                    historicoCli = await this.historicoBarbeiroController.buscarHistorico(agendaCliente.usuarioId);
                    this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info);
                    this.historicoBarbeiroController.inserirAgendamento(historicoBarb._id, agendamento._id);
                    this.historicoClienteController.inserirAgendamento(historicoCli._id, agendamento._id);

                    break;

                default:
                    throw Error('Status inválido!')
            }*/

            return res.status(200).json({
                success: true,
                msg: `Agendamento foi ${status}`,
                agendamento
            });

        } catch (err) {
            console.log(err.message)
            console.log(err)
            return res.status(400).json({
                err,
                success: false,
                msg: `Incapaz de atualizar agendamento: ${err.message}`
            });
        }

    }

}

export default AgendaBarbeiroController;