import Usuario from "./usuario-domain";

class Barbeiro extends Usuario{
    constructor(email, nome, senha, telefone, validado, cpf, /*posGeo --Receber posicaoGeoJSON*/){ //falta certificado
        super(email, nome, senha, telefone, validado);
        this.cpf = cpf;
        //this.posGeo = posGeo;
        //this.certificado = certificado;
    }
}

export default Cliente;