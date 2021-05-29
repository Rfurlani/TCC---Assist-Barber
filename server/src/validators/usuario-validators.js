import { check } from "express-validator";

//Validações do Usuario
const nome = check('nome', "Nome é obrigatório.").not().isEmpty();
const email = check('email', "Digite um email válido.").isEmail();
const telefone = check('telefone', "Campo de telefone não preenchido.").not().isEmpty();
const senha = check('senha', "Senha com no mínimo 6 caracteres.")
    .isLength({
        min: 6
    });

export const ValidacaoCadastro = [senha, email, nome, telefone];
export const ValidacaoAutenticacao = [email, senha];