//Responsável pelo Login e Cadastro
import debug from 'debug';
import { Strategy } from 'passport-local';
import passport from 'passport';

//Importa model do usuario
import Usuario from '../../models/usuarioModel.js';

const DEBUG = debug('dev');
//Campos de autenticação customizados
const authFields = {
  usernameField: 'email',
  passwordField: 'senha',
  passReqToCallback: true,
};

passport.use(
  'login',//Login
  new Strategy(authFields, async (req, email, senha, cb) => {
    try {
      const usuario = await Usuario.findOne({
        $or: [{ email }, { userName: email }],
      });

      if (!usuario || !usuario.senha) {
        return cb(null, false, { message: 'Senha ou email incorretos.' });
      }

      const checaSenha = await usuario.comparePassword(senha);

      if (!checaSenha) {
        return cb(null, false, { message: 'Senha ou email incorretos.' });
      }
      return cb(null, usuario, { message: 'Logado com sucesso!' });
    } catch (err) {
      DEBUG(err);
      return cb(null, false, {statusCode: 400, message: err.message});
    }
  }),
);

passport.use(
  'signup',//Cadastro
  new Strategy(authFields, async (req, email, senha, cb) => {
    try {
    const checaEmail = await Usuario.checkExistingField('email', email);

      if (checaEmail) {
        return cb(null, false, {
          statusCode: 409,
          message: 'Email já cadastro. Tente logar.',
        });
      }    

      const newUser = new Usuario();
      newUser.email = req.body.email;
      newUser.senha = req.body.senha;
      newUser.nome = req.body.nome;
      newUser.cpf = req.body.cpf;
      newUser.telefone = req.body.telefone;
      newUser.cargo = req.body.cargo;
      await newUser.save();
      return cb(null, newUser);
    } catch (err) {
        DEBUG(err)
      return cb(null, false, {statusCode: 400, message: err.message});
    }
  }),
);

export default passport;