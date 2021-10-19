import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import {
    checarAgendamento, 
    checarCancelamento, 
    checarConfirmacao, 
    checarSeConfirmado, 
    checarFinalizar
} from "../middlewares/middleware-agendamento.js";

import AgendaBarbeiroController from "../controllers/agenda-barbeiro-controller.js";

class AgendaBarbeiroRouter {
    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.agendaBarbeiroController = new AgendaBarbeiroController();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/get-agenda',
            this.usuarioAuth,
            this.validator,
            this.agendaBarbeiroController
                .getAgenda.bind(this.agendaBarbeiroController));

        this.router.get('/get-agendamento/:id',
            this.usuarioAuth,
            this.validator,
            this.agendaBarbeiroController
                .getAgendamento.bind(this.agendaBarbeiroController));

        this.router.patch('/:idAgendaBarbeiro/agendamento/:idAgendamento/confirmar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            checarAgendamento,
            checarConfirmacao,
            this.agendaBarbeiroController
                .gerenciarAgendamento.bind(this.agendaBarbeiroController));

        this.router.patch('/:idAgendaBarbeiro/agendamento/:idAgendamento/cancelar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            checarAgendamento,
            checarCancelamento,
            this.agendaBarbeiroController
                .gerenciarAgendamento.bind(this.agendaBarbeiroController));

        this.router.patch('/:idAgendaBarbeiro/agendamento/:idAgendamento/finalizar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            checarAgendamento,
            checarFinalizar,
            this.agendaBarbeiroController
                .gerenciarAgendamento.bind(this.agendaBarbeiroController));

        this.router.patch('/:idAgendaBarbeiro/agendamento/:idAgendamento/gerenciar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            checarAgendamento,
            checarSeConfirmado,
            this.agendaBarbeiroController
                .gerenciarAgendamento.bind(this.agendaBarbeiroController));


    }
}

export default new AgendaBarbeiroRouter().router;