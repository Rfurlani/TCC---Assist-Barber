import { Agenda } from '../models';

class AgendaDAO {

    constructor(){
        this.model = Agenda;
    }

    criarAgenda(payload){
        const agenda = new this.model(payload);
        return agenda.save();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    buscarHorarios(id){
        return this.model.findById(id).populate('agendamentos', 'dataHora').exec();
    }

    async buscarPorUsuarioId(idUsuario){
        const agenda = await this.model.findOne({ usuarioId: idUsuario }).populate(
            {
                path:'agendamentos', model: 'agendamentos', select: 'agendaBarbeiroId servicos preco',
                populate:[{
                    path:'agendaBarbeiroId', model: 'agendas', select: 'usuarioId _id',
                    populate: {path:'usuarioId', model:'usuarios', select: 'nome telefone email -_id'}
                },
                {
                    path:'agendaClienteId', model: 'agendas', select: 'usuarioId _id',
                    populate: {path:'usuarioId', model:'usuarios', select: 'nome telefone email -_id'}
                },
                {
                    path:'servicos', model: 'servicos', select: '-_id nome preco'
                }]
            }).exec();
        return agenda;
    }

    salvarAgendamento(idAgenda, idAgendamento) {
        this.model.findByIdAndUpdate(
            idAgenda,
            { $push: { agendamentos: idAgendamento } },
            { new: true, useFindAndModify: false }
        ).exec();
    }
    
}

export default AgendaDAO;