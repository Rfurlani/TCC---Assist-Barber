import Usuario from '../models/usuario.js'

const tratarErros = (err) =>{
  let errors = {email:'', senha:'', telefone:''};

  // erro email duplicado
  if (err.code === 11000) {
    errors.email = 'Esse email já está sendo usado.';
    errors.telefone = 'Esse telefone já está sendo usado.';
    return errors;
  }

  // erro de validação
  if (err.message.includes('Usuario validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

//Cadastrar Usuario
export const cadastrar = async (req, res) =>{
    const {nome, email, senha, cpf, telefone, cargo} = req.body;
    try{
      const usuario = await Usuario.create({nome, email, senha, cpf, telefone, cargo});
      res.status(201).json(usuario);
    }catch(err){
      const errors = tratarErros(err);
      res.status(400).json({errors});
    }
}

//Alterar Usuario
export const alterarUsuario = (req, res) => {
  Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((usuario) =>{
      try {
        res.status(201).json(usuario);
      } catch (err) {
        res.status(400).json({err});
      }
    })
}

//Deletar Usuario
export const deletarServico = (req, res) => {
  const id = req.params.id;
  Servico.findByIdAndDelete(id)
    .then(servico => {
      res.status(201).json(servico);
      console.log('Deletado', res);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({err});
    });
}

//Submete o login ao banca para comparar
export const login = async (req, res) =>{
  const {email, senha} = req.body;
  try{
    const usuario = await Usuario.login(email, senha);
    res.status(201).json({usuario: usuario._id});
  }catch(err){
    console.log(err);
    res.status(400).json({});
  }
}

//Busca uma lista de usuários
export const getUsuarios = async (req, res) => {
  Usuario.find(function (err, usuarios) {
    if (err) return next(err);
    res.json(usuarios);
  });
}

//Pega um usuário específico
export const getUsuario = async (req, res) =>{
  const {email} = req.body;
  try{
    const usuario = await Usuario.getUsuario(email);
    res.status(201).json({usuario: usuario});
  }catch(err){
    res.status(400).json({});
    console.log(err);
  }
}