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