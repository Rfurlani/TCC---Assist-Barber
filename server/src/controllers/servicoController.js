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
export const dadosServico = (req, res) => {
  const id = req.params.id;
  Servico.findById(id)
    .then(res => {
      res.json(servico)
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}
//Atualizar Servico
export const atualizarServico = (req, res) => {
  const id = req.params.id;
  Servico.findByIdAndUpdate(id)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

//Deletar Servico
export const deletarServico = (req, res) => {
  const id = req.params.id;
  Servico.findByIdAndDelete(id)
    .then(res => {
      console.log('Deletado', res)
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}