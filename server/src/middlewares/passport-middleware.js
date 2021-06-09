import passport from 'passport';
import BarbeiroDAO from '../repositories/barbeiroDAO';
import ClienteDAO from '../repositories/clienteDAO';
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

        let clienteDAO = new ClienteDAO();

        let barbeiroDAO = new BarbeiroDAO();

        let usuario = await barbeiroDAO.buscarPorID(id) || await clienteDAO.buscarPorID(id);

        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        let { _id, email, cargo } = usuario;

        usuario = { _id, email, cargo };

        return done(null, usuario);

    } catch (err) {

        done(null, false);

    }
})
);