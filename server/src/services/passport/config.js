//Responsável por pegar e decodificar o JWT
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import Usuario from '../../models/usuarioModel.js';

config()

//segredo público JWT
const jwtPublicSecret = process.env.JWT_PUBLIC_SECRET.replace(/\\n/g, '\n');

//Extrai JWT de Cookie
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  
  return token;
};

//Utiliza algorítimo RS256 para manter autenticação JWT
const options = {
  secretOrKey: jwtPublicSecret,
  algorithms: ['RS256'],
  passReqToCallback: true,
};

//Envia requesição com cookie para extrair JWT
options.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  req => cookieExtractor(req),
]);

//Extrai o usuário do JWT pelo id dentro do JWT
passport.use(
  new Strategy(options, (req, jwtPayload, done) => {
    Usuario.findOne({ _id: jwtPayload.id })
      .then(usuario => {
        if (usuario) {
          delete usuario._doc.senha;
          done(null, usuario);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err, false);
        }
      });
  }),
);

export default passport;