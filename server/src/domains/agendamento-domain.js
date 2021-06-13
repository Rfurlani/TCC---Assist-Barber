class Agendamento{

    constructor(agenda, cliente, endereco, dataHora, servicos, status){
        this.agenda = agenda;
        this.cliente = cliente;
        this.endereco = endereco;
        this.dataHora = dataHora;
        this.servicos = servicos;
        this.status = status;
    }
}

export default Agendamento;