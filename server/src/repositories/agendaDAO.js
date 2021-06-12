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

    async buscarPorBarbeiro(id){
        const agenda = this.model.find({ barbeiro: id });
        agenda.getFilter();
        return await agenda.exec();
    }

    salvarAgendamento(idAgendamento, idBarbeiro) {
        this.model.findByIdAndUpdate(
            idBarbeiro,
            { $push: { agendamentos: idAgendamento } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

}

export default AgendaDAO;