import Agendamento from '../domains/agendamento-domain.js';
import AgendamentoDAO from '../repositories/agendamentoDAO.js';

class AgendamentoController {

    constructor() {
        this.agendamentoDAO = new AgendamentoDAO();
    }

    /**
     * @description Cria agendamento na agenda com status de requisicao
     */

    async criarAgendamento(agendamento, idAgendaBarbeiro, idAgendaCliente) {

        agendamento = new Agendamento(
            idAgendaBarbeiro,
            idAgendaCliente,
            agendamento.endereco,
            agendamento.dataHora,
            agendamento.servicos,
            'solicitação'
        );

        agendamento = await this.agendamentoDAO.criarAgendamento(agendamento);

        return agendamento;

    }

    /**
     * @description Listar os agendamentos de uma agenda de Barbeiro
     */

    async listarAgendamentosCliente(idAgenda) {

        return await this.agendamentoDAO.buscarPorAgendaCliente(idAgenda);

    }

    /**
     * @description Listar os agendamentos de uma agenda de Cliente
     */

    async listarAgendamentosCliente(idAgenda) {

        return await this.agendamentoDAO.buscarPorAgendaCliente(idAgenda);

    }

    /**
     * @description Listar os agendamentos de uma agenda de Barbeiro
     */

     async listarAgendamentosBarbeiro(idAgenda) {

        return await this.agendamentoDAO.buscarPorAgendaBarbeiro(idAgenda);
    }

    /**
     * @description Altera, confirma ou cancela um agendamento
     */

    async atualizarAgendamento(idAgendamento, agendamento) {
        return await this.agendamentoDAO.atualizarAgendamento(idAgendamento, agendamento);
    }
}

export default AgendamentoController;
