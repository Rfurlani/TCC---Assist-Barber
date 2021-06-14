import Usuario from "./usuario-domain";

class Barbeiro extends Usuario{
    constructor(email, nome, senha, telefone, validado, cpf, 
        servicos, posGeo, imagemPerfil, certificado, cargo, notificacao){
        super(email, nome, senha, telefone, validado, imagemPerfil, cargo, notificacao);
        this.cpf = cpf;
        this.servicos = servicos;
        this.posGeo = posGeo;
        this.certificado = certificado;
    }
}

export default Barbeiro;