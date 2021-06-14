import { AgendaCliente } from '../models';

class AgendaClienteDAO {

    constructor(){
        this.model = AgendaCliente;
    }

    criarAgenda(payload){
        const agenda = new this.model(payload);
        return agenda.save();
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
    }

    async buscarPorCliente(id){
        const agenda = this.model.find({ cliente: id }).populate('agendamentos');
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