import { Agenda } from '../models';

class AgendaDAO {

    constructor(){
        this.model = Agenda;
    }

    criarAgenda(payload){
        const agenda = new this.model(payload);
        agenda.save();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    buscarHorarios(id){
        return this.model.findById(id).populate('agendamentos', 'dataHora').exec();
    }

    async buscarPorUsuarioId(idUsuario){
        const agenda = this.model.find({ usuarioId: idUsuario }).populate('agendamentos');
        agenda.getFilter();
        return await agenda.exec();
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