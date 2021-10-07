import { Agendamento } from '../models';

class AgendamentoDAO {

    constructor(){
        this.model = Agendamento;
    }

    async buscarPorID(id){

        const agendamento = await this.model.findById(id).populate([
        {
            path:'agendaBarbeiroId', model: 'agendas', select: 'usuarioId',
            populate: {path:'usuarioId', model:'usuarios', select: 'nome telefone email'}
        },
        {
            path:'agendaClienteId', model: 'agendas', select: 'usuarioId',
            populate: {path:'usuarioId', model:'usuarios', select: 'nome telefone email'}
        },
        {
            path:'servicos', model: 'servicos', select: '-barbeiroId'
        }
        ]).exec();
        return agendamento;
    }

    buscarStatusAgendamento(idAgendaCliente, idAgendaBarbeiro, status){
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
