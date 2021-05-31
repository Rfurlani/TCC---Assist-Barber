import passport from 'passport';

export const usuarioAuth = passport.authenticate("jwt", {session: false});