import passport from 'passport';
import { Usuario } from '../models';
import { Strategy } from 'passport-jwt';
import { SECRET } from '../constants';

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
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor
};

//Definindo Estratégia
passport.use('jwt', new Strategy(opcs, async ({ id }, done) => {
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