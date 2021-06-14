import { AgendaCliente } from '../models';

class AgendaClienteDAO {

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

    async buscarPorUsuario(id){
        const agenda = this.model.find({ usuario: id }).populate('agendamentos');
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

export default AgendaClienteDAO;