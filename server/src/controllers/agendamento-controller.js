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
        try {

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

        } catch (err) {

            return err;

        }


    }

    /**
     * @description Listar os agendamentos de uma agenda de Barbeiro
     */

    async listarHorarios(idAgenda) {
        try {

            return await this.agendamentoDAO.buscarHorarios(idAgenda);

        } catch (err) {

            return err;

        }
    }

    /**
     * @description Listar os agendamentos de uma agenda de Cliente
     */

    async listarAgendamentosCliente(idAgenda) {
        try {

            return await this.agendamentoDAO.buscarPorAgendaCliente(idAgenda);

        } catch (err) {

            return err;

        }

    }

    /**
     * @description Altera, confirma ou cancela um agendamento
     */

    async atualizarAgendamento(idAgendamento, agendamento) {
        try {
            
        return await this.agendamentoDAO.atualizarAgendamento(idAgendamento, agendamento);

        } catch (err) {

            return err;
            
        }
    }
}

export default AgendamentoController;
