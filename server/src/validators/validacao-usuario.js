import {compararSenha} from '../utils/bcrypt-functions.js'

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

    checarEmailSistema = function (usuario) {
        if (!usuario) {
            throw new Error("Email não cadastrado!");
        }
    }

    compararSenha = function (senha, hash) {
        compararSenha(senha, hash);
    }

}

export default ValidacaoUsuario;