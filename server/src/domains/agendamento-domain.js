class Agendamento{

    constructor(agendaBarbeiro, agendaCliente, endereco, dataHora, servicos, status){
        this.agendaBarbeiro = agendaBarbeiro;
        this.agendaCliente = agendaCliente;
        this.endereco = endereco;
        this.dataHora = dataHora;
        this.servicos = servicos;
        this.status = status;
    }
}

export default Agendamento;