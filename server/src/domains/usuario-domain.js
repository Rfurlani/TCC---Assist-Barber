class Usuario {

    constructor(email, nome, senha, telefone, validado){
        this.email = email,
        this.nome = nome,
        this.senha = senha,
        this.telefone = telefone
        this.validado = validado
        if (this.constructor === Usuario){
            throw new TypeError('Classe Abstrata "Usuario" não pode ser instanciada')
        }
    }
}

export default Usuario;