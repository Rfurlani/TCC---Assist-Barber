import { Router } from 'express';
import AuthController from '../controllers/auth-controller.js';
import { usuarioAuth } from '../middlewares/auth-guard.js';
import Validator from '../middlewares/validator-middleware.js';

class AuthRouter {

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.usuarioAuth = usuarioAuth;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.post('/autenticar-usuario',
            this.authController
                .autenticar.bind(this.authController));

        this.router.get('/deslogar-usuario',
            this.usuarioAuth,
            this.validator,
            this.authController
                .deslogar.bind(this.authController));

    }


}

export default new AuthRouter().router;