import Servico from '../models/servicos.js'

//Cadastrar Servico
export const cadastrar = async (req, res) =>{
    const {nome, descricao, preco, userId} = req.body;
    try{
      const servico = await Servico.create({nome, descricao, preco, userId});
      res.status(201).json({
        message: "Serviço cadastrado!",
        success: true,
        servico
      })
    }catch(err){
      res.status(400).json({
        message: "Cadastro de serviço falhou!",
        success: true,
        err
      });
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
      if(!servico){
        res.status(404).send({
          message: "Servico não existe!",
          success: false
        });
      }else{
        res.json(servico);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
//Atualizar Servico
export const atualizarServico = (req, res) => {
  Servico.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((servico) =>{
      try {
        if(!servico){
          res.status(404).send({
            message: "Servico não existe!"
          });
        }else{
          res.send({
            message:"Servico alterado com sucesso!"
          });
        }
      } catch (err) {
        res.status(500).send({
          message:"Não foi possível alterar o servico!"
        });
      }
    })
}

//Deletar Servico
export const deletarServico = (req, res) => {
  const id = req.params.id;
  Servico.findByIdAndDelete(id)
      .then(servico => {
        if(!servico){
          res.status(404).send({
            message: "Servico não existe!"
          });
        } else {
          res.send({
            message:"Servico deletado com sucesso!"
          });
        }
    })
    .catch(err => {
      res.status(500).send({
        message:"Não foi possível deletar o servico!"
      });
    });
}
