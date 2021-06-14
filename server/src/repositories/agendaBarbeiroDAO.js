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

    async buscarPorUsuario(id){
        const agenda = this.model.find({ barbeiro: id }).populate('agendamentos');
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

export default AgendaBarbeiroDAO;