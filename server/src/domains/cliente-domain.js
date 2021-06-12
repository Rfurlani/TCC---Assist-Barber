import Usuario from "./usuario-domain";

class Cliente extends Usuario{
    constructor(email, nome, senha, telefone, validado, endereco, imagemPerfil, cargo){
        super(email, nome, senha, telefone, validado, imagemPerfil, cargo);
        this.endereco = endereco;
    }
}

export default Cliente;