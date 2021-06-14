import Agendamento from '../domains/agendamento-domain.js';
import AgendamentoDAO from '../repositories/agendamentoDAO.js';

class AgendamentoController {

    constructor() {
        this.agendamentoDAO = new AgendamentoDAO();
    }

    /**
     * @description Cria agendamento na agenda com status de requisicao
     */

    async criarAgendamento(agendamento, idAgenda, idCliente) {

        agendamento = new Agendamento(
            idAgenda,
            idCliente,
            agendamento.endereco,
            agendamento.dataHora,
            agendamento.servicos,
            'solicitação'
        );

        agendamento = await this.agendamentoDAO.criarAgendamento(agendamento);

        return agendamento;

    }

    /**
     * @description Listar os agendamentos de uma agenda
     */

    async listarAgendamentos(idAgenda) {

            return await this.agendamentoDAO.buscarPorAgenda(idAgenda);

    }

    /**
     * @description Altera, confirma ou cancela um agendamento do Barbeiro autenticado
     */

    async atualizarAgendamento(idAgendamento, agendamento) {
        return await this.agendamentoDAO.atualizarAgendamento(idAgendamento, agendamento);
    }
}

export default AgendamentoController;
