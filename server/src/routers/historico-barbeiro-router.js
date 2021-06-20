import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import HistoricoBarbeiroController from "../controllers/historico-barbeiro-controller.js";

class HistoricoBarbeiroRouter {
    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.historicoBarbeiroController = new HistoricoBarbeiroController();
        this.loadRoutes();
    }

    loadRoutes(){
        this.router.get('/exibir-historico',
        this.usuarioAuth,
        this.validator,
        this.historicoBarbeiroController
            .exibirHistorico.bind(this.historicoBarbeiroController));


    }
}

export default new HistoricoBarbeiroRouter().router;