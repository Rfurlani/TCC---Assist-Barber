class Agendamento{

    constructor(agendaBarbeiroId, agendaClienteId, endereco, dataHora, servicos, total, status, avaliacao){
        this.agendaBarbeiroId = agendaBarbeiroId;
        this.agendaClienteId = agendaClienteId;
        this.endereco = endereco;
        this.dataHora = dataHora;
        this.servicos = servicos;
        this.total = total;
        this.status = status;
        this.avaliacao = avaliacao;
    }
}

export default Agendamento;