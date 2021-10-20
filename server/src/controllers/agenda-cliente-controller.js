import AgendaController from "./agenda-controller.js";
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoController from "./agendamento-controller.js";
import NotificacaoController from "./notificacao-controller.js";
import AvaliacaoController from "./avaliacao-controller.js";

class AgendaClienteController extends AgendaController {

    constructor() {

        super();
        this.agendaDAO = new AgendaDAO();
        this.agendamentoController = new AgendamentoController();
        this.notificacaoController = new NotificacaoController();
        this.avaliacaoController = new AvaliacaoController();
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

     async criarAgenda(idUsuario) {
        return await super.excluirAgenda(idUsuario);
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

            if (!agenda._id) {
                throw Error(agenda)
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

            if(!agendamento._id){
                throw Error('Erro ao criar agendamento.')
            }

            this.agendaDAO.salvarAgendamento(idAgendaCliente, agendamento._id);

            this.agendaDAO.salvarAgendamento(idAgendaBarbeiro, agendamento._id);

            const info = `Solicitação de agendamento por ${user.nome}.`

            let email = await this.agendaDAO.buscarEmail(agenda._id);

            let assunto = `Solicitação de agendamento`;

            this.notificacaoController.criarNotificacao(agenda.usuarioId, info, email, assunto);

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
     * @description Retorna agendamento solicitado
     * @api /agenda-cliente/agendamento/:id
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
     * @api /agenda-cliente/agendamento/:idAgendamento/cancelar-agendamento
     * @access private
     * @type PATCH
     */

    async cancelarAgendamento(req, res) {
        try {
            const { idAgendamento } = req.params;

            const { user, body } = req;

            const agendamento = await this.agendamentoController.atualizarAgendamento(idAgendamento, body);

            if(!agendamento._id){
                throw Error(`Erro ao atualizar: ${agendamento}`)
            }
            
            const info = `Agendamento de ${user.nome} no horário ${agendamento.dataHora} foi cancelado.`;

            let email = await this.agendaDAO.buscarEmail(agendamento.agendaBarbeiroId);

            let assunto = `Cancelamento de agendamento`;

            this.notificacaoController.criarNotificacao(agendamento.agendaBarbeiroId, info, email, assunto);

            return res.status(200).json({
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

            let agendamento = await this.agendamentoController.getAgendamento(idAgendamento);

            if(agendamento === null){
                throw new Error('Agendamento não encontrado!');
            }

            const agendaBarbeiro = await this.agendaDAO.buscarPorID(agendamento.agendaBarbeiroId);

            if(agendaBarbeiro == null){
                throw new Error('Agenda não encontrada!');
            }

            const barbeiroId = agendaBarbeiro.usuarioId;

            avaliacao = await this.avaliacaoController.avaliarBarbeiro(clienteId, barbeiroId, avaliacao);

            if(avaliacao === null){
                throw new Error('Avaliacao não criada!');
            }

            agendamento.avaliacao = avaliacao._id;
            this.agendamentoController.inserirAvaliacao(agendamento._id, agendamento);

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