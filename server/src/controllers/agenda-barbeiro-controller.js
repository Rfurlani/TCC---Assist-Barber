import AgendaDAO from '../repositories/agendaDAO.js';
import AgendaController from "./agenda-controller.js";
import UsuarioDAO from "../repositories/usuarioDAO.js";
import autorizarOperacao from '../utils/autorizar-operacao.js';
import AgendamentoController from "./agendamento-controller.js";
import NotificacaoController from "./notificacao-controller.js";


class AgendaBarbeiroController extends AgendaController {

    constructor() {
        super();
        this.agendaDAO = new AgendaDAO();
        this.agendamentoController = new AgendamentoController();
        this.usuarioDAO = new UsuarioDAO();
        this.notificacaoController = new NotificacaoController();
    }

    /**
     * @description Criar uma agenda para o usuario cadastrado
     */

    async criarAgenda(idUsuario) {
        return await super.criarAgenda(idUsuario);
    }

    /**
     * @description Exclui uma agenda para o usuario cadastrado
     */

     async excluirAgenda(idUsuario) {
        return await super.excluirAgenda(idUsuario);
    }

    /**
     * @description Retorna agendamento solicitado
     * @api /agenda-barbeiro/agendamento/:id
     * @access private
     * @type GET
     */

    async getAgendamento(req, res) {
        try {

            const { id } = req.params;

            let agendamento = await super.getAgendamento(id);

            if (!agendamento._id) {
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

            if (agendaBarbeiro === null) {
                throw new Error('Agenda não encontrada!');
            }

            const idUsuario = agendaBarbeiro.usuarioId;

            autorizarOperacao(idUsuario.toString(), user._id.toString());

            let agendamento = await this.agendamentoController.atualizarAgendamento(idAgendamento, body);

            if (!agendamento._id) {
                throw Error(`Erro ao atualizar: ${agendamento}`)
            }

            const status = agendamento.status;

            const agendaCliente = await this.agendaDAO.buscarPorID(agendamento.agendaClienteId);

            if (agendaCliente === null) {
                throw new Error('Agenda não encontrada!');
            }

            let email = await this.agendaDAO.buscarEmail(agendamento.agendaClienteId);

            let assunto = `Alterações em Agendamento ${agendamento.status}`;

            const info = `Agendamento sofreu alterações pelo barbeiro ${user.nome},
                abaixo o novo agendamento:
                            Agendamento está ${agendamento.status},
                            ${agendamento.endereco},
                            ${agendamento.dataHora},
                            ${agendamento.total}`;

            this.notificacaoController.criarNotificacao(agendaCliente.usuarioId, info, email, assunto);

            return res.status(200).json({
                success: true,
                msg: `Agendamento foi alterado com sucesso!`,
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