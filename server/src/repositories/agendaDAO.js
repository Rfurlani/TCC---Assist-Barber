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

    async buscarPorUsuarioId(idUsuario){
        const agenda = this.model.find({ usuarioId: idUsuario }).populate('agendamentos');
        agenda.getFilter();
        return await agenda.exec();
    }

    salvarAgendamento(idAgendaCliente, idAgendamento) {
        this.model.findByIdAndUpdate(
            idAgendaCliente,
            { $push: { agendamentos: idAgendamento } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

}

export default AgendaDAO;