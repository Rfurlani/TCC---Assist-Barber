import Servico from '../models/servico.js'

//Cadastrar Servico
export const cadastrar = async (req, res) =>{
    const {nome, descricao, preco} = req.body;
    try{
      const servico = await Servico.create({nome, descricao, preco});
      res.status(201).json(servico);
    }catch(err){
      res.status(400).json({err});
    }
}
//Listar Todos Servicos
export const listarServicos = async (req, res) => {
  Servico.find(function (err, servicos) {
    if (err) return next(err);
    res.json(servicos);
  });
}

//Listar 1 Servico

//Alterar Servico

//Deletar Servico