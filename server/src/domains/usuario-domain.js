class Usuario {

    constructor(email, nome, senha, telefone, validado, imagemPerfil, cargo, notificacao){
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.telefone = telefone;
        this.validado = validado;
        this.imagemPerfil = imagemPerfil;
        this.cargo = cargo;
        this.notificacao = notificacao;
    }
}

export default Usuario;