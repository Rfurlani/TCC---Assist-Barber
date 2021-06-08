import { compareSync } from 'bcryptjs';

class ValidacaoUsuario {

    constructor() { }

    checarEmailCadastro = function (usuario) {
        if (usuario) {
            throw new Error("Email já cadastrado");
        }
    }

    checarEmailAutenticacao = function (usuario) {
        if (!usuario) {
            throw new Error("Senha/Email incorreta(o).")
        }
    }

    compararSenha = function (senha, hash) {
        if(!compareSync(senha, hash)){
            throw Error("Senha/Email incorreta(o).")
        }
    }

}

export default ValidacaoUsuario;