class Usuario {

    constructor(email, nome, senha, telefone, validado, 
        imagemPerfil, cargo, notificacao, codigoVerificacao, agenda){
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.telefone = telefone;
        this.validado = validado;
        this.imagemPerfil = imagemPerfil;
        this.cargo = cargo;
        this.notificacao = notificacao;
        this.codigoVerificacao = codigoVerificacao;
        this.agenda = agenda;
    }
}

export default Usuario;