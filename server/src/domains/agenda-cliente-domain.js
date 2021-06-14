import Agenda from "./agenda-domain.js";

class AgendaCliente extends Agenda {
    constructor(cliente){
        this.cliente = cliente;
        super(agendamentos);
    }
}

export default AgendaCliente;