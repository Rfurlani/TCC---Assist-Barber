import passport from 'passport';

/**
 * @description Autentica o JWT no passport
 */

export const usuarioAuth = passport.authenticate("jwt", { session: false });