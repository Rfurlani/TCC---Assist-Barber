import AgendaBarbeiro from "../domains/agenda-barbeiro-domain.js";
import AgendaBarbeiroDAO from '../repositories/agendaBarbeiroDAO.js';
import autorizarOperacao from "../utils/autorizar-operacao.js";
import AgendamentoController from "./agendamento-controller.js";

class AgendaBarbeiroController {

    constructor() {
        this.agendaBarbeiroDAO = new AgendaBarbeiroDAO();
        this.agendamentoController = new AgendamentoController();
    }

    /**
     * @description Criar uma agenda para o cliente cadastrado
     */

    async criarAgendaBarbeiro(idBarbeiro) {

        let agenda = new AgendaBarbeiro(
            [],
            idBarbeiro
        );

        agenda = await this.agendaBarbeiroDAO.criarAgenda(agenda);

    }

    /**
     * @description Busca informações da agenda do usuario autenticado
     * @api /agenda-barbeiro/buscar-agenda
     * @access private
     * @type GET
     */

    async buscarAgenda(req, res) {

        try {
            const idBarbeiro = req.user._id;

            let agenda = await this.agendaBarbeiroDAO.buscarPorBarbeiro(idBarbeiro);

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
     * @description Cria grava uma solicitação de agendamento na agenda do barbeiro
     */

    async salvarSolicitacao(idAgendaBarbeiro, idAgendamento) {
            this.agendaBarbeiroDAO.salvarAgendamento(idAgendaBarbeiro, idAgendamento);
            //Emitir notificação barbeiro
    }

    /**
     * @description Lista da agenda escolhida
     * @api /agenda-barbeiro/:idAgenda/agendamentos
     * @access private
     * @type GET
     */

    async listarAgendamentos(req, res) {
        try {
            const { idAgenda } = req.params;

            let agendamentos = await this.agendamentoController.listarAgendamentosBarbeiro(idAgenda);

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

export default AgendaBarbeiroController;