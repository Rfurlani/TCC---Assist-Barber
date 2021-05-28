import debug from 'debug';
import passportJWT from '../services/passport/config.js';
import { erroAplicacao } from '../helpers/errors.js';

const DEBUG = debug('dev');
export default {
  autenticar: (req, res, next) => {
    passportJWT.authenticate('jwt', { session: false }, (err, usuario, info) => {
      if (err) {
        return next(err);
      }
      //Se não existir um usuário o token é inválido
      if (!usuario) {
        throw new erroAplicacao(
          401,
          'Token inválido, por favor logue ou cadastre-se.',
        );
      }

      req.usuario = usuario;
      // DEBUG(user.userName);
      return next();
    })(req, res, next);
  },
};