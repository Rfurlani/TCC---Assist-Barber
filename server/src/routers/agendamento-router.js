import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import AgendamentoController from "../controllers/agendamento-controller.js";

class AgendamentoRouter {

    constructor(){
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.agendamentoController = new AgendamentoController();
        this.loadRoutes();
    }

    loadRoutes(){

        this.router.post('/agenda/:idAgenda/criar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.agendamentoController
                .criarRequisicao.bind(this.agendamentoController));

    }

}

export default new AgendamentoRouter().router;