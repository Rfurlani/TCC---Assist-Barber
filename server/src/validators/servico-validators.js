import { check } from "express-validator";

//Validações de Servico
const nome = check('nome', "Preencha o nome do serviço.").not().isEmpty();
const preco = check('preco', "Preencha o preço do serviço.").not().isEmpty();
const descricao = check('descricao', "Preencha a descrição do serviço.").not().isEmpty();

export const ValidacaoServico = [nome, descricao, preco];