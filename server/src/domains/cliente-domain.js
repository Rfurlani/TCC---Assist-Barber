import Usuario from "./usuario-domain";

class Cliente extends Usuario{
    constructor(email, nome, senha, telefone, validado, endereco, imagemPerfil){
        super(email, nome, senha, telefone, validado, imagemPerfil);
        this.endereco = endereco;
    }
}

export default Cliente;