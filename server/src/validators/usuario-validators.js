import { check } from "express-validator";

//Validações do Usuario
const nome = check('nome', "Nome é obrigatório.").not().isEmpty();
const email = check('email', "Digite um email válido").isEmail();
const senha = check('senha', "Senha com no mínimo 6 caracteres.")
    .not()
    .isLength({
        min: 6
    });

export const ValidacaoCadastro = [senha, email, nome];
export const ValidacaoAutenticacao = [email, senha];