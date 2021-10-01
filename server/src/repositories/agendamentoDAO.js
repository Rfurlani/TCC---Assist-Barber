import { Agendamento } from '../models';

class AgendamentoDAO {

    constructor(){
        this.model = Agendamento;
    }

    buscarPorID(id){
        return this.model.findById(id).populate({
            populate:[{
                path:'agendaBarbeiroId', model: 'agendas', select: 'usuarioId -_id',
                populate: {path:'usuarioId', model:'usuarios', select: '-_id'}
            },
            {
                path:'agendaClienteId', model: 'agendas', select: 'usuarioId -_id',
                populate: {path:'usuarioId', model:'usuarios', select: '-_id'}
            },
            {
                path:'servicos', model: 'servicos', select: '-_id'
            }]
        }).exec();
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

    async atualizarAgendamento(id, avaliacaoId){
        return await this.model.findByIdAndUpdate(
            id,
            { 'avaliacao': avaliacaoId },
            { new: true }
        ).exec();
    }
    
}

export default AgendamentoDAO;
