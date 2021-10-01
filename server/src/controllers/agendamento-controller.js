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
                agendamento.total,
                'solicitacao',
                null
            );

            if(agendamento === null){
                throw new Error('Agendamento não criado!');
            }

            agendamento = await this.agendamentoDAO.criarAgendamento(agendamento);

            if(agendamento === null){
                throw new Error('Agendamento não salvo!');
            }

            return agendamento;

        } catch (err) {

            return err;

        }


    }

    /**
     * @description Altera um agendamento
     */

    async atualizarAgendamento(idAgendamento, infoAgendamento) {
        try {

            const agendamento = await this.agendamentoDAO
                .atualizarAgendamento(idAgendamento, infoAgendamento);

            if(agendamento === null){
                throw new Error('Agendamento não encontrado!');
            }

            return agendamento;

        } catch (err) {

            return err;

        }
    }

    /**
     * @descripition Retorna um agendamento específico
     */

    async getAgendamento(id) {

        try {

            const agendamento = await this.agendamentoDAO.buscarPorID(id);
            
            if(agendamento === null){
                throw new Error('Agendamento não encontrado!');
            }
            
            return agendamento;

        } catch (err) {

            return err;

        }
    }

    async inserirAvaliacao(agendamentoId, avaliacaoId){
        try {

            const agendamento = await this.agendamentoDAO
                .atualizarAgendamento(agendamentoId, avaliacaoId);

            if(agendamento === null){
                throw new Error('Agendamento não encontrado!');
            }

            return agendamento;

        } catch (err) {

            return err;

        }
    }
}

export default AgendamentoController;
