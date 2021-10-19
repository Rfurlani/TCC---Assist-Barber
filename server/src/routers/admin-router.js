import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import AdminController from '../controllers/admin-controller.js'

class AdminRouter {
    constructor() {
        this.router = Router();
        this.adminController = new AdminController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {

        this.router.patch('/exibir-admin',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('admin'),
            this.adminController
                .exibirAdmin.bind(this.adminController));

        this.router.patch('/:idAdmin/exibir-admin',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('admin'),
            this.adminController
                .exibirAdmin.bind(this.adminController));
    }
}

export default new AdminRouter().router;