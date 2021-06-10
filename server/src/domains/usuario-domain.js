class Usuario {

    constructor(email, nome, senha, telefone, validado, imagemPerfil){
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.telefone = telefone;
        this.validado = validado;
        this.imagemPerfil = imagemPerfil;
        if (this.constructor === Usuario){
            throw new TypeError('Classe Abstrata "Usuario" não pode ser instanciada')
        }
    }
}

export default Usuario;