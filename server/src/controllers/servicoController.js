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

//Atualizar Servico

//Deletar Servico