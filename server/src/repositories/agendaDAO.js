import { Agenda } from '../models';

class AgendaDAO {

    constructor(){
        this.model = Agenda;
    }

    criarAgenda(payload){
        const agenda = new this.model(payload);
        return agenda.save();
    }

    buscarAgenda(id){

    }

    async inserirAgendamento(id, agendamento){
        
    }
}

export default AgendaDAO;