import Agenda from "./agenda-domain.js";

class AgendaBarbeiro extends Agenda {
    constructor(cliente){
        this.cliente = cliente;
        super(agendamentos);
    }
}

export default AgendaBarbeiro;