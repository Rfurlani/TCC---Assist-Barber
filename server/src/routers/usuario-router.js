import { Router } from 'express';

import UsuarioController from '../controllers/usuario-controller.js';

class UsuarioRouter {
    constructor() {
        this.router = Router();
        this.usuarioController = new UsuarioController();
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
    }
}

export default new UsuarioRouter().router;