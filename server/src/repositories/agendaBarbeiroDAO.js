import { AgendaBarbeiro } from '../models';

class AgendaBarbeiroDAO {

    constructor(){
        this.model = AgendaBarbeiro;
    }

    criarAgenda(payload){
        const agenda = new this.model(payload);
        return agenda.save();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    async buscarPorBarbeiro(id){
        const agenda = this.model.find({ barbeiro: id }).populate('agendamentos');
        agenda.getFilter();
        return await agenda.exec();
    }

    salvarAgendamento(idAgendaBarbeiro, idAgendamento) {
        this.model.findByIdAndUpdate(
            idAgendaBarbeiro,
            { $push: { agendamentos: idAgendamento } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

}

export default AgendaBarbeiroDAO;