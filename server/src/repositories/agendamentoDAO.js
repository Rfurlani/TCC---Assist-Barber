import { Agendamento } from '../models';

class AgendamentoDAO {

    constructor(){
        this.model = Agendamento;
    }

    buscarPorID(id){
        return this.model.findById(id).exec();
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
