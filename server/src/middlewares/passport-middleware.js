import passport from 'passport';
import { Usuario } from '../models';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SECRET as secretOrKey } from '../constants';

//Extrair JWT de cookie
const cookieExtractor = req => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies['jwt'];
    }

    return jwt;
}

//Opções de configuração
const opcs = {
    secretOrKey,
    jwtFromRequest: cookieExtractor
};
//Definindo Estratégia
passport.use(
    new Strategy(opcs, async ({ id }, done) => {
        try {
            let usuario = await Usuario.findById(id);
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }
            return done(null, usuario.getUsuarioInfo());
        } catch (err) {
            done(null, false);
        }
    })
);