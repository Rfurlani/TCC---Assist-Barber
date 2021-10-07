import { Agendamento } from '../models';

class AgendamentoDAO {

    constructor(){
        this.model = Agendamento;
    }

    async buscarPorID(id){

        const agendamento = await this.model.findById(id).populate([
        {
            path:'agendaBarbeiroId', model: 'agendas', select: 'usuarioId -_id',
            populate: {path:'usuarioId', model:'usuarios', select: '-_id nome telefone email'}
        },
        {
            path:'agendaClienteId', model: 'agendas', select: 'usuarioId -_id',
            populate: {path:'usuarioId', model:'usuarios', select: '-_id nome telefone email'}
        },
        {
            path:'servicos', model: 'servicos', select: '-_id -barbeiroId'
        }
        ]).exec();
        return agendamento;
    }

    buscarAgendamentoSolicitacao(idAgendaCliente, idAgendaBarbeiro){
        let agendamento = this.model.findOne({ 'agendaBarbeiroId': idAgendaBarbeiro, 'agendaClienteId': idAgendaCliente});
        return agendamento;
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

    buscarAgendamentoClienteBarbeiro(idAgendaCliente, idAgendaBarbeiro){
        let agendamento = this.model.findOne({ 'agendaBarbeiroId': idAgendaBarbeiro, 'agendaClienteId': idAgendaCliente});
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
