import Usuario from '../models/usuario.js'

//Cadastrar Usuario
export const cadastrar = async (req, res) =>{
    const {nome, email, senha, cpf, telefone, cargo} = req.body;
    try{
      const usuario = await Usuario.create({nome, email, senha, cpf, telefone, cargo});
      res.status(201).json(usuario);
    }catch(err){
      //const errors = tratarErros(err);
      res.status(400).json({err});
    }
}

//Submete o login ao banca para comparar
export const login = async (req, res) =>{
  const {email, senha} = req.body;
  try{
    const usuario = await Usuario.login(email, senha);
    res.status(201).json({usuario: usuario._id});
  }catch(err){
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