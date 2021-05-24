import Servico from '../models/servico.js'

//Cadastrar Servico
export const cadastrar = async (req, res) =>{
    const {nome, descricao, preco, userId} = req.body;
    try{
      const servico = await Servico.create({nome, descricao, preco, userId});
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
export const dadosServico = (req, res) => {
  const id = req.params.id;
  Servico.findById(id)
    .then(servico => {
      res.json(servico)
    })
    .catch(err => {
      console.log(err);
    });
}
//Atualizar Servico
export const atualizarServico = (req, res) => {
  const id = req.params.id;
  const {nome, descricao, preco, userId} = req.body;
  Servico.findByIdAndUpdate(id)
    .then(servico => {
      try{
        const servico = Servico.updateOne({nome, descricao, preco, userId});
        res.status(201).json(servico);
      }catch(err){
        res.status(400).json({err});
      }
    })
    .catch(err => {
      console.log(err);
    });
}

//Deletar Servico
export const deletarServico = (req, res) => {
  const id = req.params.id;
  Servico.findByIdAndDelete(id)
    .then(servico => {
      try{
        res.status(201).json(servico);
        console.log('Deletado', res);
      }catch(err){
        res.status(400).json({err});
      }
    })
    .catch(err => {
      console.log(err);
    });
}