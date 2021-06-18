import { Agendamento } from '../models';

class AgendamentoDAO {

    constructor(){
        this.model = Agendamento;
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    buscarAgendamentoSolicitacao(idAgendaCliente, idAgendaBarbeiro){
        let agendamento = this.model.findOne({ 'agendaBarbeiroId': idAgendaBarbeiro, 'agendaClienteId': idAgendaCliente, 'status':'solicitacao'});
        return agendamento;
    }

    buscarAgendamentoConfirmado(idAgendaCliente, idAgendaBarbeiro){
        let agendamento = this.model.findOne({ 'agendaBarbeiroId': idAgendaBarbeiro, 'agendaClienteId': idAgendaCliente, 'status':'confirmado'});
        return agendamento;
    }

    buscarAgendamentoSolicitacaoCancelamento(idAgendaCliente, idAgendaBarbeiro){
        let agendamento = this.model.findOne({ 'agendaBarbeiroId': idAgendaBarbeiro, 'agendaClienteId': idAgendaCliente, 'status':'cancelamento solicitado'});
        return agendamento;
    }

    buscarAgendamentoStatus(idAgendaCliente, idAgendaBarbeiro, status){
        let agendamento = this.model.findOne({ 'agendaBarbeiroId': idAgendaBarbeiro, 'agendaClienteId': idAgendaCliente, 'status':status});
        return agendamento;
    }

    criarAgendamento(payload){
        const agendamento = new this.model(payload);
        return agendamento.save();
    }

    async atualizarAgendamento(id, body){
        return await this.model.findByIdAndUpdate(
            id,
            { ...body },
            { new: true }
        ).exec();
    }
    
}

export default AgendamentoDAO;
