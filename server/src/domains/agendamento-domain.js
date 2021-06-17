class Agendamento{

    constructor(agendaBarbeiroId, agendaClienteId, endereco, dataHora, servicos, status){
        this.agendaBarbeiroId = agendaBarbeiroId;
        this.agendaClienteId = agendaClienteId;
        this.endereco = endereco;
        this.dataHora = dataHora;
        this.servicos = servicos;
        this.status = status;
    }
}

export default Agendamento;