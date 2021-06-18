import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import HistoricoClienteController from "../controllers/historico-cliente-controller.js";

class HistoricoClienteRouter {
    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.historicoClienteController = new HistoricoClienteController();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/exibir-historico',
            this.usuarioAuth,
            this.validator,
            this.historicoClienteController
                .exibirHistorico.bind(this.historicoClienteController));


    }
}

export default new HistoricoClienteRouter().router;