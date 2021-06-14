import Usuario from "./usuario-domain";

class Cliente extends Usuario{
    constructor(email, nome, senha, telefone, validado, endereco, imagemPerfil, cargo, notificacao){
        super(email, nome, senha, telefone, validado, imagemPerfil, cargo, notificacao);
        this.endereco = endereco;
    }
}

export default Cliente;