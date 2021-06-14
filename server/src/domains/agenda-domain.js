class Agenda{

    constructor(agendamentos){
        this.agendamentos = agendamentos;
        if (this.constructor === Agenda){
            throw new TypeError('Classe Abstrata "Agenda" não pode ser instanciada!')
        }
    }
    
}

export default Agenda;