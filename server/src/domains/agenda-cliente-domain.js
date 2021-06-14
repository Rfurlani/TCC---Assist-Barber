import Agenda from "./agenda-domain.js";

class AgendaCliente extends Agenda {
    constructor(agendamentos, cliente){
        super(agendamentos);
        this.cliente = cliente;
    }
}

export default AgendaCliente;