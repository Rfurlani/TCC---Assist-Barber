import Subject from "./subject";

class Agenda extends Subject{

    constructor(barbeiro, agendamentos){
        this.barbeiro = barbeiro;
        this.agendamentos = agendamentos;
    }

}

export default Agenda;