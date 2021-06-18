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
        const agenda = await this.model.findOne({ usuarioId: idUsuario }).populate('agendamentos').exec();
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