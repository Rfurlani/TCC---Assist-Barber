import Usuario from "./usuario-domain";

class Cliente extends Usuario{
    constructor(email, nome, senha, telefone, validado, endereco){
        super(email, nome, senha, telefone, validado);
        this.endereco = endereco;
    }
}

export default Cliente;