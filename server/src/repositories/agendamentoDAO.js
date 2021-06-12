import { Agendamento } from '../models';

class AgendamentoDAO {

    constructor(){
        this.model = Agendamento;
    }


    criarAgendamento(payload){
        const agendamento = new this.model(payload);
        return agendamento.save();
    }

    buscarAgendamento(id){

    }

    async inserirAgendamentomento(id, Agendamentomento){
        
    }
}

export default AgendamentoDAO;
