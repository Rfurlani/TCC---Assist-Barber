import passport from 'passport';
import UsuarioDAO from '../repositories/usuarioDAO.js'
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SECRET } from '../constants';

//Opções de configuração
const opcs = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

//Definindo Estratégia
passport.use('jwt', new Strategy(opcs, async ({ id }, done) => {

    try {

        let usuarioDAO = new UsuarioDAO();

        let usuario = await usuarioDAO.buscarPorID(id);

        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        let { _id, email, nome, cargo } = usuario;

        usuario = { _id, email, nome, cargo };

        return done(null, usuario);

    } catch (err) {

        done(null, false);

    }
})
);