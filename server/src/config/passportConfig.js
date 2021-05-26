import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcrypt'

//Carregar Modelo Usuario
import Usuario from '../models/usuario.js'

export default function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, senha, done) => {
            // Comparar Usuário
            Usuario.findOne({
              email: email
            }).then(usuario => {
              if (!usuario) {
                return done(null, false, { message: 'Este email não foi registrado' });
              }
              // Comparar Senha
              bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, usuario);
                } else {
                  return done(null, false, { message: 'Senha Incorreta' });
                }
              });
            });
          })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
    
}
