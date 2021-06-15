import Agenda from "./agenda-domain.js";

class AgendaBarbeiro extends Agenda {
    constructor(agendamentos, barbeiro){
        super(agendamentos);
        this.barbeiro = barbeiro;
    }
}

export default AgendaBarbeiro;