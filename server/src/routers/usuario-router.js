import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import Validator from '../middlewares/validator-middleware.js';

import UsuarioController from '../controllers/usuario-controller.js';

class UsuarioRouter {
    constructor() {
        this.router = Router();
        this.usuarioController = new UsuarioController();
        this.usuarioAuth = usuarioAuth;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.post('/cadastrar-usuario',
            this.usuarioController
                .cadastrar
                .bind(this.usuarioController));

        this.router.post('/autenticar-usuario',
            this.usuarioController
                .autenticar.bind(this.usuarioController));

        this.router.get('/notificacao/:id/marcar-vista',
            this.usuarioAuth,
            this.validator,
            this.usuarioController
                .visualizarNotificacao.bind(this.usuarioController));

        this.router.delete('/notificacao/:id/excluir',
            this.usuarioAuth,
            this.validator,
            this.usuarioController
                .excluirNotificacao.bind(this.usuarioController));
    }
}

export default new UsuarioRouter().router;